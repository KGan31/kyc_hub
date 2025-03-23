import React from "react";
import { Table, Button, Image, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Compare({ compareList, removeFromCompare, addToCompare }) {
  const removeColumns = [
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
      title: "Remove", 
      key: "remove", 
      render: (_, record) => (
        <Button danger onClick={() => removeFromCompare(record.id)}>Remove</Button>
      ),
    }
  ];
  const addColumns = [
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    axios.get("https://dummyjson.com/products")
      .then(response => {
        setProducts(response.data.products);
        setLoading(false);
      });
  }, []);

  return (
    <>
    <Table 
      dataSource={compareList} 
      columns={removeColumns} 
      pagination={false} 
    />
    <Button type="primary" onClick={showModal}>
        Add more products
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800}>
        <Table 
          dataSource={products} 
          columns={addColumns} 
          loading={loading} 
          pagination={{ pageSize: 5 }} 
        />
      </Modal>
    </>
  );

}
