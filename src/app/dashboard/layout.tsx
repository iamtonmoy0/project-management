import { Layout } from "antd";
import Slider from "@/components/Slider/Slider";

export default function layout({ children }: any) {
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Slider />
        <Layout className="h-auto">
          {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
          {children}
        </Layout>
      </Layout>
    </>
  );
}
