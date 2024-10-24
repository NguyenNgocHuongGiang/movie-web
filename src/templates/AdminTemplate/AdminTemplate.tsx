import React, { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb, Dropdown } from "antd";
import {
  NavLink,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { USER_LOGIN } from "../../utils/config";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setLogout } from "../../apis/apiNguoiDung/nguoiDungDetail";

const { Header, Content, Footer, Sider } = Layout;

const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const onCollapse = (collapsed: any) => {
    setCollapsed(collapsed);
  };

  let user: any;

  // useEffect(() => {
    const userItem = localStorage.getItem(USER_LOGIN);
    if (userItem) {
      user = JSON.parse(userItem);
    }
    if (!userItem) {
      redirect("/login");
    } else {
      if (user.maLoaiNguoiDung !== "QuanTri") {
        navigate("/")
      }
    }
  // }, []);

  const items = [
    {
      key: "1",
      label: (
        <p
          onClick={() => {
            dispatch(setLogout(navigate, location));
          }}
        >
          Đăng xuất
        </p>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo p-2">
          <h1 className="text-yellow-500 font-medium flex justify-center items-center text-xl mt-3">
            CINEMA
          </h1>
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <NavLink to="/admin/dashboard">Dashboard</NavLink>
          </Menu.Item>

          <Menu.Item key="2" icon={<UserOutlined />}>
            <NavLink to="/admin/manageUser">Users</NavLink>
          </Menu.Item>

          <Menu.Item key="10" icon={<FileOutlined />}>
            <NavLink to="/admin/manageFilm">Films</NavLink>
          </Menu.Item>

          <Menu.Item key="3" icon={<DesktopOutlined />}>
            <NavLink to="/admin/manageShowTime">Showtime</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background flex items-center justify-end"
          style={{ padding: 0 }}
        >
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomRight"
            arrow={{
              pointAtCenter: true,
            }}
          >
            <div className="text-right pr-10 pt-1 flex items-center cursor-pointer">
              <UserOutlined className="text-lg bg-gray-200 text-black p-2 rounded-full mr-2" />
              <span className="text-white">{user?.taiKhoan}</span>
            </div>
          </Dropdown>
        </Header>

        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: "85vh",
              backgroundColor: "white",
              width: "100%",
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
