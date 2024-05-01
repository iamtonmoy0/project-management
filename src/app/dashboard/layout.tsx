"use client";

import {
  FileOutlined,
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Avatar,
  Divider,
  Layout,
  List,
  Menu,
  Spin,
  theme,
  Typography,
} from "antd";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const { Header, Sider } = Layout;

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

export default function layout({ children }) {
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
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
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
              renderItem={(d) => (
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
        <Layout className="h-auto">
          {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
          {children}
        </Layout>
      </Layout>
    </>
  );
}
