
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
// PAGES
import Home from "./pages/Home";
import Compare from "./pages/Compare";

import {
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ProductOutlined,
  } from '@ant-design/icons';
  import { Button, Layout, Menu, theme } from 'antd';
  const { Header, Sider, Content } = Layout;

export default function App() {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [compareList, setCompareList] = useState([]);

  const addToCompare = (product) => {
    if (compareList.length < 4 && !compareList.some(p => p.id === product.id)) {
      setCompareList([...compareList, product]);
    }
  };

  const removeFromCompare = (id) => {
    setCompareList(compareList.filter(product => product.id !== id));
  };
    return (
      <div className="App">
      <Router>
      <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: <Link to='/'>Product Details</Link>,
              path: '/',
            },
            {
              key: '2',
              icon: <ProductOutlined />,
              label: <Link to='/compare'>Compare</Link>,
              path: '/compare',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
          }}
        >
          

          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <img 
            src="https://w7.pngwing.com/pngs/426/341/png-transparent-shopping-cart-e-commerce-online-shopping-logo-shopping-cart-blue-service-logo.png"  // Update with actual logo path
            alt="Logo"
            style={{ width: 50, height: 50, objectFit: "contain"}} // Adjust size and spacing
          />
          <h2>Product Comparison</h2>
        </Header>
        <Content style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}>
          <Routes>
            <Route path="/" element={<Home addToCompare={addToCompare} compareList={compareList} />} />
            <Route path="/compare" element={<Compare compareList={compareList} removeFromCompare={removeFromCompare}/>} />
          </Routes>
        </Content>
      </Layout>
    
    </Layout>
    </Router>
    </div>
    );
  }