"use client";

import { useQuery, useQueryErrorResetBoundary } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UserOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Drawer, Spin, Typography } from "antd";
import Activity from "@/components/Activity/Activity";

const { Title, Text } = Typography;
export default function SingleTask() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState<any>({});

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      try {
        const response = await fetch("/project.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return await response.json();
      } catch (error: any) {
        throw new Error("Error fetching data:", error);
      }
    },
  });
  useEffect(() => {
    if (isSuccess && data && data.length > 0) {
      const foundProject = data.find((item: any) => item.id === id);
      if (foundProject) {
        setProject(foundProject);
      }
    }
  }, [isSuccess, data, id]);
  let content = null;
  if (isLoading) {
    content = (
      <div className="mx-auto my-auto">
        <Spin />
      </div>
    );
  } else if (isError) {
    content = <p>error</p>;
  } else {
    content = (
      <>
        <Drawer title="Project Activity" onClose={onClose} open={open}>
          <Activity activity={project.teamMembers} />
        </Drawer>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <Title level={3}>{project.name}</Title>
            <Text>Date: {project.date}</Text>
            <Text>{project.description}</Text>
          </div>
          <div className="flex flex-row ">
            <Button className="mr-2" type="primary" onClick={showDrawer}>
              <UserOutlined />
              Activity
            </Button>
            <Button size={"large"}>
              <UserAddOutlined />
            </Button>
          </div>
        </div>
      </>
    );
  }

  return <div className="px-2 py-2">{content}</div>;
}
