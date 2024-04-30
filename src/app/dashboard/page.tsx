"use client";

import Card from "@/components/Card/Card";
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
  // console.log(data);
  return (
    <div className=" mx-4 ">
      <div className=" pt-6 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8  overflow-y-auto ">
        {data && data.length > 0
          ? data.map((p) => <Card key={p.id} project={p} />)
          : null}
      </div>
    </div>
  );
}
