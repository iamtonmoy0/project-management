"use client";
import { Avatar, Divider, List, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import Link from "next/link";
import React, { useState } from "react";
import {
  FileOutlined,
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "User",
    "2",
    <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
  ),
  getItem(
    "Home",
    "1",
    <Link href={"/dashboard"}>
      <HomeOutlined />
    </Link>
  ),
];
export default function Slider() {
  const [collapsed, setCollapsed] = useState(false);
  const { data, isLoading, isError, isSuccess } = useQuery<any>({
    queryKey: ["projects"],
    queryFn: async () => {
      try {
        const response = await fetch("project.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return await response.json();
      } catch (error: any) {
        throw new Error("Error fetching data:", error);
      }
    },
  });
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
      <Divider />
      <div className="">
        <List
          loading={isLoading}
          dataSource={data}
          renderItem={(d: any) => (
            <Link href={`/dashboard/${d.id}`}>
              <List.Item className=" hover:bg-blue-500 px-2  rounded-md">
                <p className=" font-medium text-medium mx-auto text-white">
                  {d.name}
                </p>
              </List.Item>
            </Link>
          )}
        />
      </div>
    </Sider>
  );
}
