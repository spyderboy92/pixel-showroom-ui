import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "../Images/logo3-removebg-preview-A85w98Br26fjqqOy.png";

const Navbar = () => {
  return (
    <div
      className="navbar-container"
      style={{
        backgroundColor: "#333",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      {/* Logo Section */}
      <div className="logo" style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          alt="Logo"
          style={{ height: "40px", marginRight: "10px" }}
        />
      </div>

      {/* Navigation Menu */}
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ flexGrow: 1, justifyContent: "flex-end" }}
        defaultSelectedKeys={["1"]}
      >
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/features">Features</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/contact">Contact</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
