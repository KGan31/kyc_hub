import React, { useEffect, useState } from "react";
import { Table, Button, Image } from "antd";
import axios from "axios";

const Home = ({ addToCompare , compareList}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://dummyjson.com/products")
      .then(response => {
        setProducts(response.data.products);
        setLoading(false);
      });
  }, []);

  const columns = [
    { title: "Image", dataIndex: "thumbnail", key: "thumbnail", render: (img) => <Image width={50} src={img} /> },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description", ellipsis: true },
    { title: "Price ($)", dataIndex: "price", key: "price", defaultSortOrder: 'descend',
      sorter: (a, b) => a.price - b.price},
    { title: "Discount (%)", dataIndex: "discountPercentage", key: "discountPercentage", defaultSortOrder: 'descend',
      sorter: (a, b) => a.discountPercentage - b.discountPercentage },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Category", dataIndex: "category", key: "category" },
    { 
      title: "Compare",
      key: "compare",
      render: (_, record) => (
        <Button type="primary" onClick={() => addToCompare(record)} disabled = {compareList.some(product => product.id === record.id)}>{!loading && compareList.some(product => product.id === record.id) ? "Added" : "Compare"}</Button>
      ),
    },
  ];

  return (
    <Table 
      dataSource={products} 
      columns={columns} 
      loading={loading} 
      pagination={{ pageSize: 5 }} 
    />
  );
};

export default Home;
