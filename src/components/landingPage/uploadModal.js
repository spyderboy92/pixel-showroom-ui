import React from "react";
import { Modal, Upload, Button, Form, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const UploadModal = ({ isVisible, handleOk, handleCancel, handleUpload }) => {
  const [form] = Form.useForm();

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        handleOk(values);
      })
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
      });
  };
  const onModalClose = () => {
    form.resetFields();
    handleCancel();
  };
  return (
    <Modal
      title="Upload Files"
      open={isVisible}
      onOk={onOk}
      onCancel={onModalClose}
      footer={[
        <Button key="cancel" onClick={onModalClose}>
          Cancel
        </Button>,
        <Button key="ok" type="primary" onClick={onOk}>
          OK
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        {/* Car Image */}
        <Form.Item
          label="Car Image"
          name="car_image"
          rules={[{ required: true, message: "Please upload a car image!" }]}
        >
          <Upload
            name="car_image"
            listType="picture"
            onChange={handleUpload}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload Car Image</Button>
          </Upload>
        </Form.Item>

        {/* Logo */}
        <Form.Item label="Logo" name="logo" rules={[{ required: false }]}>
          <Upload
            name="logo"
            listType="picture"
            onChange={handleUpload}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload Logo</Button>
          </Upload>
        </Form.Item>

        {/* Background */}
        <Form.Item
          label="Background"
          name="background"
          rules={[{ required: false }]}
        >
          <Upload
            name="background"
            listType="picture"
            onChange={handleUpload}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload Background</Button>
          </Upload>
        </Form.Item>

        {/* Logo Position */}
        <Form.Item
          label="Logo Position"
          name="logo_position"
          rules={[
            { required: false, message: "Please select a logo position!" },
          ]}
        >
          <Select placeholder="Select logo position">
            <Option value="top-left">Top Left</Option>
            <Option value="top-right">Top Right</Option>
            <Option value="bottom-left">Bottom Left</Option>
            <Option value="bottom-right">Bottom Right</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UploadModal;
