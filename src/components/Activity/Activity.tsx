import { Avatar, Divider, List } from "antd";
import React from "react";
import {UserOutlined}from "@ant-design/icons"
export default function Activity({ activity }) {
  return (
    <div>
      <p className="text-xl font-medium text-gray-500">Last Viewed</p>
      <Divider />
      <List
        dataSource={activity}
        renderItem={(item) => (
          <List.Item key={item}>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={<a href="https://ant.design">{item}</a>}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
