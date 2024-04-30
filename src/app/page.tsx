"use client";
import { FieldType } from "@/types/formType";
import { Button, Form, Input, Checkbox, Alert } from "antd";
import type { FormProps } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  let email = "user@user.com";
  let password = "123456";

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (values.email == email && values.password == password) {
      setSuccess(true);
      router.push("/dashboard");
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
    // console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  let content = null;
  if (success) {
    content = <Alert message="login successful" type="success" showIcon />;
  } else if (error) {
    content = <Alert message="Wrong Credentials" type="warning" showIcon />;
  } else {
    content = null;
  }
  return (
    <div className="w-auto h-[450px]  flex">
      <div>{content}</div>
      <div className="mx-auto pt-[100px]">
        <p className="text-center mb-6 font-semibold text-gray-700 text-3xl">Login Here!</p>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className=""
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email address!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
