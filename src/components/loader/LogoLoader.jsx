import React from "react";
import "../styles/logo-loader.css";
import logo from "/loader-logo.webp"; // <-- apna path set karo

export default function LogoLoader() {
  return (
    <div className="logo-loader-overlay">
      <div className="logo-loader-container">
        <div className="logo-loader-ring"></div>
        <div className="logo-loader-ring ring-2"></div>

        <div className="logo-loader-logo-wrap">
          <img src={logo} alt="Loading..." className="logo-loader-logo" />
        </div>
      </div>

      <p className="logo-loader-text">Loading Hope...</p>
    </div>
  );
}