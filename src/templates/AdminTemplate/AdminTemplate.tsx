import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';

import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const AdminTemplate = () => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = (collapsed : any) => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo p-2">
                    <img style={{ height: '50px' }} src="https://img.freepik.com/premium-vector/film-production-cinema-logo-design-template_618034-260.jpg" alt="..." />
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
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
                <Header className="site-layout-background" style={{ padding: 0 }} >
                    <div className="text-right pr-10 pt-1">aaaa</div>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>

                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: '85vh', backgroundColor: 'white', width: '100%' }}>
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default AdminTemplate