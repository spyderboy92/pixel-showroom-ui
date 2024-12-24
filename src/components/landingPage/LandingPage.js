import React, { useState } from "react";
import { Layout, Typography, Button, Spin, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import UploadModal from "./uploadModal";
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
      // formData.resetFields();

      setIsLoading(true); // Start loading state

      // Prepare payload using FormData
      const payload = new FormData();

      if (formData.car_image?.file) {
        payload.append("car_image", formData.car_image.file.originFileObj);
      } else {
        throw new Error("Car image is required");
      }
      if (formData.logo?.file) {
        payload.append("logo", formData.logo.file.originFileObj);
      }
      if (formData.background?.file) {
        payload.append("background", formData.background.file.originFileObj);
      }
      payload.append("logo_position", formData.logo_position || "top-right");

      console.log("Payload being sent:");
      for (let [key, value] of payload.entries()) {
        console.log(`${key}:`, value);
      }

      // API URL
      const url = "http://54.162.137.71/api/v1/process-car-image";

      // Send request
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });

      console.log("API response:", response.data);

      // Update UI with the response
      const imageUrl = URL.createObjectURL(response.data);
      setResultImage(imageUrl || response.data.image_base64);
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

    console.log("Modal Cancel clicked");
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

        {/* Display Loading Spinner or Result Image */}
        <div style={{ marginTop: "30px" }}>
          {isLoading && <Spin size="large" />}
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

              {/* Download Button */}
              <Button
                type="primary"
                style={{ marginTop: "20px" }}
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = resultImage; // Use the Blob URL
                  link.download = "processed_image.png"; // Default file name
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

      {/* Footer */}
      <Footer style={{ textAlign: "center" }}>Pixel ShowRoom©2024</Footer>
    </Layout>
  );
};

export default LandingPage;
