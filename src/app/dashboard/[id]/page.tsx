"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function SingleTask() {
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      try {
        const response = await fetch(`http://localhost:3001/projects/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return await response.json();
      } catch (error: any) {
        throw new Error("Error fetching data:", error);
      }
    },
  });
  return <div>{JSON.stringify(data)}</div>;
}
