import React, { useState } from "react";
import { Layout, Typography, Button, Spin, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import UploadModal from "../UploadModal/uploadModal";
import "./landingPage.css";
import axios from "axios";

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resultImage, setResultImage] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (formData) => {
    try {
      setIsModalOpen(false); // Close the modal
      setIsLoading(true); // Start loading state

      const payload = new FormData();

      if (formData.car_image?.file) {
        payload.append("car_image", formData.car_image.file); // No need for `.originFileObj` if it is already set
      } else {
        throw new Error("Car image is required");
      }

      if (formData.logo?.file) {
        payload.append("logo", formData.logo.file);
      }

      if (formData.background?.file) {
        payload.append("background", formData.background.file);
      }

      payload.append("logo_position", formData.logo_position || "top-right");

      console.log("Payload being sent:", payload);

      const url = "http://35.169.238.51/api/v1/process-car-image";

      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });

      const imageUrl = URL.createObjectURL(response.data);
      setResultImage(imageUrl);
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
      } else {
        console.error("Error during API call:", error.message);
      }
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout className="layout">
      <Content className="content-background">
        <Title level={1} style={{ color: "#FFFFFF", fontSize: 50 }}>
          Boost Your Sales with Stunning Car Images
        </Title>
        <Text
          type="secondary"
          style={{
            color: "#FFFFFF",
            fontSize: "18px",
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          Enhance, Customize, and Perfect Your Car Photos with AI Technology.
        </Text>
        <div style={{ marginTop: "30px" }}>
          <Button
            type="primary"
            icon={<UploadOutlined />}
            size="large"
            onClick={showModal} // Open modal on click
          >
            Click to Upload
          </Button>
        </div>
        <Text
          type="secondary"
          style={{
            color: "#FFFFFF",
            fontSize: "18px",
            textAlign: "center",
            maxWidth: "800px",
            marginTop: "30px",
          }}
        >
          Our AI tool helps car dealers create professional, retail-ready car
          images in just a few clicks -No experience required. Save time,
          enhance your listings, and drive more sales effortlessly. It’s the
          quickest way to turn everyday photos into ad-optimized images that
          sell.
        </Text>

        <div style={{ marginTop: "30px" }}>
          {resultImage && (
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Image
                src={resultImage}
                alt="Processed Result"
                width={400}
                style={{ border: "1px solid #ccc", borderRadius: "8px" }}
              />
              <Text
                type="secondary"
                style={{
                  display: "block",
                  marginTop: "20px",
                  color: "#FFF",
                  fontSize: "16px",
                }}
              >
                Processed Image Successfully Received
              </Text>
              <Button
                type="primary"
                style={{ marginTop: "20px" }}
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = resultImage; // Use the Blob URL
                  link.download = "processed_image.png";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                Download Image
              </Button>
            </div>
          )}
        </div>
      </Content>

      {/* Upload Modal */}
      <UploadModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />

      {/* Full-Screen Loader */}
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" style={{ color: "#fff" }} />
        </div>
      )}

      <Footer style={{ textAlign: "center" }}>Pixel ShowRoom©2024</Footer>
    </Layout>
  );
};

export default LandingPage;
