// src/components/HomeHeader.tsx
import React from "react";

// You should have an actual logo file in your assets. Replace with your path.
import siteLogo from "../../assets/Wise_Logo_BrightGreen_RGB.svg";
// Estonian flag emoji or image
import eeFlag from "../../assets/flag-ee.svg"; // or use emoji "🇪🇪"

export default function HomeHeader() {
  return (
    <header style={headerStyle}>
      <div style={leftNavStyle}>
        <img src={siteLogo} alt="Site Logo" style={logoStyle} />
        <nav style={navLinksStyle}>
          <a href="#" style={navLinkStyle}>Personal</a>
          <a href="#" style={navLinkStyle}>Business</a>
          <a href="#" style={navLinkStyle}>Platform</a>
        </nav>
      </div>

      <div style={rightNavStyle}>
        <button style={langButtonStyle}>
          <img src={eeFlag} alt="EE flag" style={flagStyle} />
          <span style={{ marginLeft: 6 }}>EN</span>
        </button>
        <a href="#" style={navLinkStyle}>Help</a>
        <a href="#" style={navLinkStyle}>Login</a>
        <button style={signupButtonStyle}>Sign up</button>
      </div>
    </header>
  );
}

// Inline styles (for simplicity)
const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 24px",
  borderBottom: "1px solid #e0e0e0"
};

const leftNavStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};

const logoStyle: React.CSSProperties = {
  width: 120,
  cursor: "pointer"
};

const navLinksStyle: React.CSSProperties = {
  display: "flex",
  gap: "20px",
  marginLeft: "24px",
};

const navLinkStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "#92D569",
  fontSize: "1rem",
  cursor: "pointer"
};

const rightNavStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "16px"
};

const langButtonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "1rem",
  color: "#92D569"
};

const flagStyle: React.CSSProperties = {
  width: 20,
  height: 14
};

const signupButtonStyle: React.CSSProperties = {
  padding: "8px 16px",
  backgroundColor: "#92D569",
  color: "#173205",
  border: "none",
  borderRadius: "18px", // gently rounded corners
  fontSize: "1rem",
  cursor: "pointer",
};
