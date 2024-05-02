import { Avatar, Tooltip } from "antd";
import React from "react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

export default function UnderBar({ user }: any) {
  return (
    <>
      <div className="flex flex-row justify-between">
        <p className="my-auto text-md text-gray-600 font-medium">
          <HomeOutlined style={{ fontSize: "25px" }} />
          Main Table
        </p>
        <div>
          <Avatar.Group maxCount={2}>
            {user.map((u: any) => (
              <Avatar
                src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                key={u}
              />
            ))}

            <Tooltip title="Ant User" placement="top">
              <Avatar
                style={{
                  backgroundColor: "#87d068",
                }}
                icon={<UserOutlined />}
              />
            </Tooltip>
          </Avatar.Group>
        </div>
      </div>
      <hr style={{ width: "100%", border: "1px solid black" }} />
    </>
  );
}
