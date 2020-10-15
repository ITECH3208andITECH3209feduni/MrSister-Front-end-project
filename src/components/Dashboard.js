import React, { useState } from "react";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  UploadOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
  FolderAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import InvoiceTable from "./InvoiceTable";
import SupplierList from "./SupplierList";
import CreateUser from "./CreateUser";
import AddSupplier from "./AddSupplier";
import AddItemTry from "./AddItemTry";
import UsersList from "./UsersList";
import HelpSection from "./HelpSection";

const { Header, Sider, Content } = Layout;

const Dashboard = (props) => {
  const [collapsed, setCollapse] = useState(false);

  const [activeMenuItem, setActiveMenuItem] = useState("order");

  const handleSupplierMenuClick = () => {
    setActiveMenuItem("supplier");
  };

  const handleInvoiceMenu = () => {
    setActiveMenuItem("invoice");
  };

  const handleAddUser = () => {
    setActiveMenuItem("user");
  };

  const handleAddSupplier = () => {
    setActiveMenuItem("add-supplier");
  };

  const handleUserList = () => {
    setActiveMenuItem("users-list");
  };

  const handleHelpClick = () => {
    setActiveMenuItem("help-click");
  };

  const toggle = () => {
    setCollapse(!collapsed);
  };

  return (
    <Layout>
      <ToastContainer />
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sider-wrapper"
      >
        <h2 style={{ color: "white", padding: "1rem" }}>Mr Sister Admin</h2>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />} onClick={handleAddUser}>
            CreateUser
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />} onClick={handleUserList}>
            Users
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<ShoppingCartOutlined />}
            onClick={handleInvoiceMenu}
          >
            Invoices
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<UnorderedListOutlined />}
            onClick={handleSupplierMenuClick}
          >
            Suppliers List
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<FolderAddOutlined />}
            onClick={handleAddSupplier}
          >
            Add Suppliers
          </Menu.Item>
          <Menu.Item
            key="6"
            icon={<FolderAddOutlined />}
            onClick={handleHelpClick}
          >
            Help
            
          </Menu.Item>

          <Menu.Item key="7" icon={<LogoutOutlined />}>
            {/* style={{ marginTop: "150px" }} */}
            <a href="/">Log Out</a>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ paddingLeft: "1rem" }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {activeMenuItem === "supplier" && (
            <SupplierList setSupplierActive={handleAddSupplier} />
          )}
          {activeMenuItem === "user" && <CreateUser />}
          {activeMenuItem === "add-supplier" && <AddSupplier />}
          {activeMenuItem === "invoice" && <InvoiceTable />}
          {activeMenuItem === "users-list" && <UsersList />}
          {activeMenuItem === "help-click" && <HelpSection />}
        </Content>
      </Layout>
    </Layout>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
