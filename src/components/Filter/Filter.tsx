import { Button, Dropdown, Space, Typography } from "antd";
import React from "react";
import {
  FilterOutlined,
  SortAscendingOutlined,
  EyeInvisibleOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const items = [
  {
    key: "1",
    label: "Item 1",
  },
  {
    key: "2",
    label: "Item 2",
  },
  {
    key: "3",
    label: "Item 3",
  },
];

export default function Filter() {
  return (
    <>
      <div className="flex flex-row gap-3 pt-2">
        <Button type="primary" className="bg-blue-500" size="small">
          Create New
        </Button>
        <div className="relative">
          <label htmlFor="Search" className="sr-only">
            {" "}
            Search{" "}
          </label>

          <input
            type="text"
            id="Search"
            placeholder="  Search for..."
            className="w-full rounded-md bg-slate-200 border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
          />

          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button type="button" className="text-gray-600 hover:text-gray-700">
              <span className="sr-only">Search</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </div>
        {/* filter */}
        <Dropdown
          menu={{
            items,
            selectable: true,
            defaultSelectedKeys: ["3"],
          }}
        >
          <Typography.Link>
            <Space className="p-2 font-medium">
              Filter
              <FilterOutlined />
            </Space>
          </Typography.Link>
        </Dropdown>
        {/* hide */}
        <Typography.Link>
          <Space className="p-2 font-medium">
            Hide
            <EyeInvisibleOutlined />
          </Space>
        </Typography.Link>
        {/* sort */}
        <Typography.Link>
          <Space className="p-2 font-medium">
            Sort
            <SortAscendingOutlined />
          </Space>
        </Typography.Link>
        {/* person */}
        <Typography.Link>
          <Space className="p-2 font-medium">
            Person
            <UserAddOutlined />
          </Space>
        </Typography.Link>
      </div>
    </>
  );
}
