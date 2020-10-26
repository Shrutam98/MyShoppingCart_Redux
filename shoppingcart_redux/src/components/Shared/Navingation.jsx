import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import CategoryList from "components/Category/CategoryList";
import ProductList from "components/Product/ProductList";
import Dashboard from "components/Shared/Dashboard";
import {
  HomeOutlined,
  ShoppingOutlined,
  TableOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const Navingation = () => {
  return (
    <div>
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible>
            <div className="logo" />
            <Menu
              theme="dark"
              defaultSelectedKeys={["1"]}
              mode="inline"
              className="mt-5 pt-2"
            >
              <br></br>
              <Menu.Item
                key="1"
                className="mt-2"
                icon={<HomeOutlined style={{ fontSize: "20px" }} />}
              >
                <span>Dashboard</span>
                <Link to="/" />
              </Menu.Item>
              <Menu.Item
                key="2"
                icon={<TableOutlined style={{ fontSize: "20px" }} />}
              >
                <span>Category</span>
                <Link to="/category" />
              </Menu.Item>
              <Menu.Item
                key="3"
                icon={<ShoppingOutlined style={{ fontSize: "20px" }} />}
              >
                <span>Product</span>
                <Link to="/product" />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header
              className="site-layout-background"
              style={{ padding: 0, color: "white" }}
            >
              <h2 className="text-light mt-2 ml-4">My Shopping Cart</h2>
            </Header>

            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: 280,
              }}
            >
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/category" component={CategoryList} />
              <Route path="/product" component={ProductList} />
            </Content>
            <Footer style={{ textAlign: "center" }}></Footer>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
};

export default Navingation;
