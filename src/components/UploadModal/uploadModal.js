import React from "react";
import { Modal, Upload, Button, Form, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const UploadModal = ({ isVisible, handleOk, handleCancel }) => {
  const [form] = Form.useForm();

  const handleFileChange = (fieldName, info) => {
    if (info.fileList.length > 0) {
      form.setFieldsValue({
        [fieldName]: { file: info.fileList[0].originFileObj },
      });
      console.log(`${fieldName} selected:`, info.fileList[0]);
    } else {
      form.setFieldsValue({ [fieldName]: undefined });
    }
  };

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
        <Form.Item
          label="Car Image"
          name="car_image"
          rules={[{ required: true, message: "Please upload a car image!" }]}
        >
          <Upload
            name="car_image"
            listType="picture"
            beforeUpload={(file) => false} // Prevent automatic upload
            onChange={(info) => handleFileChange("car_image", info)}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload Car Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Logo" name="logo">
          <Upload
            name="logo"
            listType="picture"
            beforeUpload={(file) => false}
            onChange={(info) => handleFileChange("logo", info)}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload Logo</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Background" name="background">
          <Upload
            name="background"
            listType="picture"
            beforeUpload={(file) => false}
            onChange={(info) => handleFileChange("background", info)}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload Background</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Logo Position" name="logo_position">
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
