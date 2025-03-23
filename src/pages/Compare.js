import React from "react";
import { Table, Button, Image } from "antd";

export default function Compare({ compareList, removeFromCompare }) {
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
      title: "Remove", 
      key: "remove", 
      render: (_, record) => (
        <Button danger onClick={() => removeFromCompare(record.id)}>Remove</Button>
      ),
    }
  ];

  return (
    <Table 
      dataSource={compareList} 
      columns={columns} 
      pagination={false} 
    />
  );

}
