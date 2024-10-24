import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Tooltip,
  DatePicker,
  Switch,
  InputNumber,
  Row,
  Col,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { addPhim, deletePhim, getPhimList } from "../../apis/apiPhim/phimDetail";
import moment from "moment";
import { ColumnType } from "antd/es/table";
import { PhimType } from "../../types/phimType";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { GROUPID } from "../../utils/config";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function ManageFilm() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFilm, setEditingFilm] = useState<PhimType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { phimList } = useSelector((state: RootState) => state.phimReducer);
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const [imgSrc, setImgSrc] = useState("");

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      biDanh: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },
    onSubmit: (values: any) => {
      console.log(values);
      values.ngayKhoiChieu = values.ngayKhoiChieu.format("DD/MM/YYYY")
      values.maNhom = GROUPID;
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      if(editingFilm){
        setEditingFilm(null)
      }else{
        dispatch(addPhim(formData))
        .then(() => {
          toast.success("Thêm phim thành công")
          dispatch(getPhimList());
        })
        .catch((error) => {
          toast.error(error.response.data.content)
        });
      }
      
    },
  });

  useEffect(() => {
    dispatch(getPhimList());
  }, [dispatch]);

  const showAddModal = () => {
    setEditingFilm(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (record: PhimType) => {
    setEditingFilm(record);
    form.setFieldsValue(record);    

    formik.setValues({
      tenPhim: record.tenPhim,
      biDanh: record.biDanh,
      trailer: record.trailer,
      moTa: record.moTa,
      ngayKhoiChieu: record.ngayKhoiChieu,
      dangChieu: record.dangChieu,
      sapChieu: record.sapChieu,
      hot: record.hot,
      danhGia: record.danhGia,
      hinhAnh: record.hinhAnh,
    });
    setImgSrc(record.hinhAnh);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleOk = () => {
    form.validateFields().then(() => {

      formik.handleSubmit();

      handleCancel();
    });
  };

  const handleDelete = (maPhim: any) => {   
    dispatch(deletePhim(Number(maPhim))).then(() => {
      toast.success("Xóa phim thành công")
      dispatch(getPhimList());
    })
    .catch((error) => {
      toast.error(error.response.data.content)
    });
  };

  const handleChangeDatePicker = (date: any) => {
    if (editingFilm) {
      console.log(date);
      if (date) {
        formik.setFieldValue("ngayKhoiChieu", moment(date));
      } else {
        formik.setFieldValue("ngayKhoiChieu", null);
      }
    } else {
      let ngayKhoiChieu = moment(date);
      formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
    }
  };

  console.log(formik.values.ngayKhoiChieu);
  
  const filteredPhim = phimList.filter(
    (phim) =>
      phim.tenPhim.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  const handleChangeFile = (e: any) => {
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setImgSrc(result);
        }
      };
      formik.setFieldValue("hinhAnh", file);
    }
  };

  const columns: ColumnType<PhimType>[] = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      key: "maPhim",
      width: 100,
      sorter: (a: any, b: any) => a.maPhim - b.maPhim,
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      width: 150,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      width: 100,
      render: (text: string) => (
        <img src={text} alt="Phim" style={{ width: "50px", height: "50px" }} />
      ),
    },
    {
      title: "Ngày khởi chiếu",
      dataIndex: "ngayKhoiChieu",
      key: "ngayKhoiChieu",
      width: 150,
      render: (dateString: string) => moment(dateString).format("DD/MM/YYYY"),
      sorter: (a: any, b: any) =>
        moment(a.ngayKhoiChieu).unix() - moment(b.ngayKhoiChieu).unix(),
      defaultSortOrder: "ascend", 
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
      width: 300,
      render: (text: string) => (
        <Tooltip title={text}>
          {text.length > 100 ? `${text.slice(0, 100)}...` : text}
        </Tooltip>
      ),
    },
    {
      title: "Hành Động",
      key: "action",
      width: 150,
      render: (text: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Sửa">
            <Button
              icon={<EditOutlined />} 
              onClick={() => showEditModal(record)}
              style={{
                backgroundColor: "#faad14",
                borderColor: "#faad14",
                color: "#fff",
              }}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              style={{
                backgroundColor: "red",
                borderColor: "red",
                color: "#ffffff",
              }}
              icon={<DeleteOutlined />} 
              onClick={() => handleDelete(record.maPhim)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={showAddModal}
        style={{ marginBottom: 16 }}
      >
        Thêm Phim
      </Button>

      <Input
        placeholder="Tìm kiếm theo tên phim"
        style={{ marginBottom: 16, width: "300px" }}
        className="ml-5"
        onChange={(e) => setSearchTerm(e.target.value)} 
      />

      <Table columns={columns} dataSource={filteredPhim} rowKey="maPhim" />

      <Modal
        title={editingFilm ? "Sửa Phim" : "Thêm Phim"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="tenPhim"
                label="Tên Phim"
                rules={[{ required: true, message: "Vui lòng nhập tên phim" }]}
              >
                <Input
                  onChange={formik.handleChange}
                  placeholder="Nhập tên phim"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="biDanh"
                label="Bí danh"
                rules={[{ required: true, message: "Vui lòng nhập bí danh" }]}
              >
                <Input
                  placeholder="Nhập bí danh"
                  onChange={formik.handleChange}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="trailer"
                label="Trailer"
                rules={[
                  { required: true, message: "Vui lòng nhập link trailer" },
                ]}
              >
                <Input
                  placeholder="Nhập link trailer"
                  onChange={formik.handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ngày khởi chiếu">
                {!editingFilm ? (
                  <DatePicker
                  format={"DD/MM/YYYY"} onChange={handleChangeDatePicker}
                  />
                ) : (
                  <DatePicker onChange={handleChangeDatePicker} format={"DD/MM/YYYY"} value={formik.values.ngayKhoiChieu ? moment(formik.values.ngayKhoiChieu) : null} />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Đang chiếu">
                <Switch
                  checked={formik.values.dangChieu}
                  onChange={(checked) =>
                    formik.setFieldValue("dangChieu", checked)
                  }
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Sắp chiếu">
                <Switch
                  checked={formik.values.sapChieu}
                  onChange={(checked) =>
                    formik.setFieldValue("sapChieu", checked)
                  }
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Hot">
                <Switch
                  checked={formik.values.hot}
                  onChange={(checked) => formik.setFieldValue("hot", checked)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Số sao">
                <InputNumber
                  min={1}
                  max={10}
                  style={{ width: "100%" }}
                  placeholder="Đánh giá"
                  onChange={(value) => formik.setFieldValue("danhGia", value)} // Cập nhật giá trị qua formik
                  value={formik.values.danhGia} // Đảm bảo giá trị đúng
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Hình ảnh">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/gif"
                  onChange={handleChangeFile}
                />
                <br />
                {imgSrc && (
                  <img
                    style={{ width: 150, height: 150, marginTop: 10 }}
                    src={imgSrc}
                    alt="..."
                  />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="moTa"
            label="Mô Tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả phim" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Nhập mô tả phim"
              onChange={formik.handleChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
