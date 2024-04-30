"use client";

import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { data, isLoading, isError, isSuccess } = useQuery<any>({
    queryKey: ["projects"],
    queryFn: async () => {
      try {
        const response = await fetch("http://localhost:3001/projects");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return await response.json();
      } catch (error: any) {
        throw new Error("Error fetching data:", error);
      }
    },
  });
  console.log(data);
  return <div> ok </div>;
}
