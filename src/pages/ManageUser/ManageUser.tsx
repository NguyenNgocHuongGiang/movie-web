import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Tooltip,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { ColumnType } from "antd/es/table";
import { PhimType } from "../../types/phimType";
import {
  addUser,
  deleteUser,
  getUserList,
  updateUser2,
} from "../../apis/apiNguoiDung/nguoiDungDetail";
import { userList } from "../../types/nguoiDungType";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { GROUPID, USER_LOGIN } from "../../utils/config";
import { toast } from 'react-toastify';

export default function ManageFilm() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFilm, setEditingFilm] = useState<PhimType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { userList } = useSelector(
    (state: RootState) => state.nguoiDungReducer
  );
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const userItem = localStorage.getItem(USER_LOGIN);
  let user: any;
  if (userItem) {
    user = JSON.parse(userItem);
  }

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const showAddModal = () => {
    setEditingFilm(null); 
    form.resetFields(); 
    setIsModalVisible(true);
  };

  const showEditModal = (record: PhimType) => {
    setEditingFilm(record); 
    form.setFieldsValue(record); 
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    form.resetFields(); // Reset form khi đóng modal
    setIsModalVisible(false);
  };

  const handleDelete = (taiKhoan: string) => {
    dispatch(deleteUser(taiKhoan));
    dispatch(getUserList());
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingFilm) {
        const userChange = {
          taiKhoan: values.taiKhoan || user?.taiKhoan,
          matKhau: values.matKhau,
          hoTen: values.hoTen || user?.hoTen,
          email: values.email || "",
          soDT: values.soDT || user?.soDT,
          maLoaiNguoiDung: values.maLoaiNguoiDung || user?.maLoaiNguoiDung,
          maNhom: `${GROUPID}`,
        };
        dispatch(updateUser2(userChange))
          .then((result) => {
            dispatch(getUserList());
          })
          .catch((error) => toast.error(error.response.data.content));
      } else {
        const userAdd = {
          taiKhoan: values.taiKhoan || user?.taiKhoan,
          matKhau: values.matKhau,
          hoTen: values.hoTen || user?.hoTen,
          email: values.email || "",
          soDt: values.soDt || user?.soDT,
          maLoaiNguoiDung: values.maLoaiNguoiDung || user?.maLoaiNguoiDung,
          maNhom: `${GROUPID}`,
        };
        dispatch(addUser(userAdd))
        .then((result) => {
          toast.success("Thêm user thành công")
          dispatch(getUserList());
        })
        .catch((error) => {
          toast.error(error.response.data.content)
        });
      }
      handleCancel();
    });
  };

  const filteredUsers = userList.filter(
    (user) =>
      user.hoTen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.taiKhoan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  const columns: ColumnType<userList>[] = [
    {
      title: "STT",
      key: "index",
      width: "5%",
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
      width: "20%",
      sorter: (a: any, b: any) => a.hoTen.localeCompare(b.hoTen),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      key: "soDt",
      width: "15%",
    },
    {
      title: "Username",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      width: "15%",
    },
    {
      title: "Mã loại",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      width: "10%",
    },
    {
      title: "Hành Động",
      key: "action",
      width: "15%",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Sửa">
            <Button
              icon={<EditOutlined />} // Sử dụng icon "Sửa"
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
              icon={<DeleteOutlined />} // Sử dụng icon "Xóa"
              onClick={() => handleDelete(record.taiKhoan)}
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
        Thêm người dùng
      </Button>

      <Input
        placeholder="Tìm kiếm theo họ tên hoặc tài khoản"
        className="ml-5"
        style={{ marginBottom: 16, width: "300px" }}
        onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật từ khóa tìm kiếm
      />

      <Table columns={columns} dataSource={filteredUsers} rowKey="taiKhoan" />

      <Modal
        title={
          <div className="font-medium text-lg">
            <span>
              {editingFilm ? "Cập nhật người dùng" : "Thêm người dùng"}
            </span>{" "}
            <hr className="mt-3" />
          </div>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="hoTen" label="Họ tên" rules={[{ required: true }]}>
            <Input placeholder="Vui lòng nhập họ tên" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input placeholder="Vui lòng nhập email" />
          </Form.Item>
          <Form.Item
            name="soDt"
            label="Số điện thoại"
            rules={[{ required: true }]}
          >
            <Input placeholder="Vui lòng nhập số điện thoại" />
          </Form.Item>
          <Form.Item
            name="taiKhoan"
            label="Tên tài khoản"
            rules={[{ required: true }]}
          >
            <Input placeholder="Vui lòng nhập tên tài khoản" />
          </Form.Item>
          <Form.Item
            name="matKhau"
            label="Mật khẩu"
            rules={[{ required: true }]}
          >
            <Input placeholder="Vui lòng nhập mật khẩu" />
          </Form.Item>
          <Form.Item
            name="maLoaiNguoiDung"
            label="Mã loại người dùng"
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn role">
              <Select.Option value="KhachHang">Khách hàng</Select.Option>
              <Select.Option value="QuanTri">Quản trị</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
