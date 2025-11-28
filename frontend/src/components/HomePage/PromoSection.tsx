// src/components/PromoSection.tsx
import React from "react";
import Playstore from "../../assets/playstore.svg";
import Appstore from "../../assets/appstore.svg";

export default function PromoSection() {
  return (
    <div style={containerStyle}>
      {/* Ratings */}
      <div style={ratingsStyle}>
        <div style={ratingItemStyle}>
            <img src={Appstore} alt="App Store" style={{ width: "24px", height: "24px" }} />
            <span style={ratingTextStyle}>4.8 ★ on App Store 152K reviews</span>
        </div>
        <div style={ratingItemStyle}>
            <img src={Playstore} alt="Google Play" style={{ width: "24px", height: "24px" }} />
            <span style={ratingTextStyle}>4.8 ★ on Google Play 1.3M reviews</span>
          </div>
      </div>


      {/* Headline */}
      <h2 style={headlineStyle}>INTERNATIONAL MONEY TRANSFERS</h2>

      {/* Description */}
      <p style={descriptionStyle}>
        Join over 14.8 million people sending money abroad — with fees{" "}
        <span style={{ color: "#92D569", textDecoration: "underline" }}>as low as 0.1%</span>.
      </p>

      {/* Benefits */}
      <ul style={benefitsListStyle}>
        <li style={benefitItemStyle}>
          <span style={benefitIconStyle}>💰</span>
          <span style={benefitTextStyle}>Low fees — fees get cheaper the more you send</span>
        </li>
        <li style={benefitItemStyle}>
          <span style={benefitIconStyle}>⚡</span>
          <span style={benefitTextStyle}>Lightning fast — money typically arrives in seconds</span>
        </li>
        <li style={benefitItemStyle}>
          <span style={benefitIconStyle}>🔒</span>
          <span style={benefitTextStyle}>Perfectly predictable — lock in an exchange rate for your international transfer</span>
        </li>
      </ul>

      {/* Buttons */}
      <div style={buttonsContainerStyle}>
        <button style={primaryButtonStyle}>Open an account</button>
        <button style={secondaryButtonStyle}>Compare our prices</button>
      </div>
    </div>
  );
}

// Styles
const containerStyle: React.CSSProperties = {
  backgroundColor: "#173204",
  color: "#363604",
  padding: "4rem 2rem 2rem 2rem", // more padding at top
  borderRadius: "18px",
  maxWidth: "600px",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  justifyContent: "center", // vertical centering
};

const ratingsStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  gap: "1.5rem",
};

const ratingItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "1rem",
};

const ratingTextStyle: React.CSSProperties = {
  color: "#92D569",
};

const headlineStyle: React.CSSProperties = {
  fontSize: "2.5rem",
  fontWeight: 700,
  margin: 0,
  color: "#92D569",
};

const descriptionStyle: React.CSSProperties = {
  fontSize: "1.25rem",
  lineHeight: 1.5,
  color: "white",
};

const benefitsListStyle: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const benefitItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
};

const benefitIconStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  color: "#92D569",
};

const benefitTextStyle: React.CSSProperties = {
  color: "white",
  fontSize: "1rem",
};

const buttonsContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
  marginTop: "1.5rem",
};

const primaryButtonStyle: React.CSSProperties = {
  backgroundColor: "#92D569",
  border: "none",
  borderRadius: "18px",
  padding: "0.75rem 1.5rem",
  color: "#173205",
  fontSize: "1rem",
  cursor: "pointer",
};

const secondaryButtonStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  border: "1px solid #92D569",
  borderRadius: "18px",
  padding: "0.75rem 1.5rem",
  color: "#92D569",
  fontSize: "1rem",
  cursor: "pointer",
};
