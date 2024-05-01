import { Avatar, Tooltip } from "antd";
import React from "react";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function Card({ project }: any) {
  return (
    <Link href={`/dashboard/${project.id}`}>
      <article className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
        <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
          <time dateTime="2022-10-10" className="block text-xs text-gray-500">
            {" "}
            {project.date}
          </time>

          <a href="#">
            <h3 className="mt-0.5 text-lg font-medium text-gray-900">
              {project.name}
            </h3>
          </a>

          <div className="mt-4 flex flex-wrap gap-1">
            <Avatar.Group maxCount={3}>
              {project.teamMembers?.map((m: any) => (
                <Tooltip key={m} title={m} placement="top">
                  <Avatar
                    style={{ backgroundColor: "#87d068" }}
                    icon={<UserOutlined />}
                  />
                </Tooltip>
              ))}

              <Avatar
                style={{ backgroundColor: "#1677ff" }}
                icon={<AntDesignOutlined />}
              />
            </Avatar.Group>
          </div>
        </div>
      </article>
    </Link>
  );
}
