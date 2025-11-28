// src/pages/Home.tsx
import React from "react";
import SendMoneyCalculator from "../components/SendMoney";
import HomeHeader from "../components/HomePage/HomeHeader";
import PromoSection from "../components/HomePage/PromoSection";

export default function Home() {
  return (
    <div style={pageStyle}>
      {/* Header */}
      <div style={headerContainerStyle}>
        <HomeHeader />
      </div>

      {/* Main content */}
      <div style={mainContentStyle}>
        <PromoSection />
        <SendMoneyCalculator />
      </div>
    </div>
  );
}

// Page background
const pageStyle: React.CSSProperties = {
  backgroundColor: "#173204",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};

// Header container
const headerContainerStyle: React.CSSProperties = {
  height: 76, // fixed height
  flexShrink: 0,
};

// Main content container
const mainContentStyle: React.CSSProperties = {
  display: "flex",
  gap: "2rem",
  padding: "2rem",
  height: 1050, // fixed height for main content
  boxSizing: "border-box",
};
