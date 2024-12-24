import React from "react";
import { Layout, Form, Input, Button, Typography } from "antd";
import "./contactUs.css";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Content, Footer } = Layout;

const ContactUs = () => {
  const handleSubmit = (values) => {
    console.log("Feedback Submitted: ", values);
  };

  const handleFailedSubmit = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout className="contact-layout">
      <Content>
        <div className="contact-form-container">
          <Title level={2} className="contact-title">
            Contact Us
          </Title>
          <Text className="contact-description">
            We’d love to hear your feedback! Please fill out the form below.
          </Text>
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            onFinishFailed={handleFailedSubmit}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please enter your name!" },
                { min: 2, message: "Name must be at least 2 characters long!" },
              ]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Feedback"
              name="feedback"
              rules={[
                { required: true, message: "Please provide your feedback!" },
              ]}
            >
              <TextArea placeholder="Write your feedback here..." rows={4} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit Feedback
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <Footer style={{ textAlign: "center", backgroundColor: "transparent" }}>
        Pixel ShowRoom ©2024
      </Footer>
    </Layout>
  );
};

export default ContactUs;
