import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
// import Home from "./pages/Home";
// import Features from "./pages/Features";
// import Contact from "./pages/Contact";
import ContactUs from "./components/Contactus/contactUs";
import LandingPage from "./components/landingPage/LandingPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        {/* { <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} /> */}{" "}
        {/* */}
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  );
};

export default App;
