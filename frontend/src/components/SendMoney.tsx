// src/components/SendMoney.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoIcon from "../assets/globe-img.png";
import usaFlag from "../assets/flag-usa.svg";
import zaFlag from "../assets/flag-za.svg";

export default function SendMoney() {
  const navigate = useNavigate();
  const [sendAmount, setSendAmount] = useState("25000");
  const [receiveAmount, setReceiveAmount] = useState("425509.57");
  const [sendCurrency, setSendCurrency] = useState("USD");
  const [receiveCurrency, setReceiveCurrency] = useState("ZAR");
  const exchangeRate = 17.1214;

  const handleSendMoney = () => {
    navigate("/transfer");
  };

  const updateSendAmount = (value: string) => {
  setSendAmount(value);

  const numeric = parseFloat(value.replace(/,/g, ""));
  if (!isNaN(numeric)) {
    setReceiveAmount((numeric * exchangeRate).toFixed(2));
  } else {
    setReceiveAmount("");
  }
  };

  const updateReceiveAmount = (value: string) => {
    setReceiveAmount(value);

    const numeric = parseFloat(value.replace(/,/g, ""));
    if (!isNaN(numeric)) {
        setSendAmount((numeric / exchangeRate).toFixed(2));
    } else {
        setSendAmount("");
    }
  }


  return (
    <div style={containerStyle}>
      {/* Rate Display */}
      <div style={rateContainerStyle}>
        <span style={rateTextStyle}>🔒 Rate guaranteed (10h)</span>
        <div style={rateHighlightStyle}>1 USD = 17.1214 ZAR</div>
      </div>

      {/* Send Input */}
      <div style={fieldStyle}>
        <label style={labelStyle}>You send exactly</label>
        <div style={inputGroupStyle}>
          <input
            type="text"
            value={sendAmount}
            onChange={(e) => updateSendAmount(e.target.value)}
            style={inputInsideGroupStyle}
          />
          <img src={usaFlag} alt="USA flag" style={flagStyle} />
          <button style={currencyInsideGroupStyle}>{sendCurrency}</button>
        </div>
      </div>

      {/* Receive Input */}
      <div style={fieldStyle}>
        <label style={labelStyle}>Recipient gets</label>
        <div style={inputGroupStyle}>
          <input
            type="text"
            value={receiveAmount}
            onChange={(e) => updateReceiveAmount(e.target.value)}
            style={inputInsideGroupStyle}
          />
          <img src={zaFlag} alt="ZA flag" style={flagStyle} />
          <button style={currencyInsideGroupStyle}>{receiveCurrency}</button>
        </div>
      </div>

      {/* Payment Method */}
      <div style={fieldStyle}>
        <label style={labelStyle}>Paying with</label>
        <div style={paymentMethodStyle}>
          <span>Bank transfer</span>
          <button style={changeButtonStyle}>Change ➔</button>
        </div>
      </div>

      {/* Fees Summary */}
      <div style={feesContainerStyle}>
        <div style={feeRowStyle}>
          <span>Bank transfer fee</span>
          <span>0 EUR</span>
        </div>
        <div style={feeRowStyle}>
          <span>Our fee</span>
          <span>141.90 EUR</span>
        </div>
        <hr style={dividerStyle} />
        <div style={feeRowStyle}>
          <strong>Total included fees (0.45%)</strong>
          <strong>133.93 EUR</strong>
        </div>
      </div>

      {/* Promo / Info Box */}
      <div style={infoBoxStyle}>
        <img src={InfoIcon} alt="Info" style={infoIconStyle} />
        <div style={infoTextContainerStyle}>
          <div style={infoBoldTextStyle}>
            You're sending a lot so we discounted our fee
          </div>
          <div style={infoGrayTextStyle}>
            Savings on this transfer, and eligible transfers for the rest of the month.
          </div>
          <div style={infoLearnMoreStyle}>Learn more</div>
        </div>
      </div>

      {/* Send Money Button */}
      <div style={actionsStyle}>
        <button style={sendButtonStyle} onClick={handleSendMoney}>
          Send money
        </button>
      </div>
    </div>
  );
}

// ----- Styles -----
const containerStyle: React.CSSProperties = {
  backgroundColor: "#f8f9fa",
  borderRadius: "12px",
  padding: "1.5rem",
  width: "550px",
  height: "780px",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  flexShrink: 0,
  overflow: "auto",
};

const rateContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  alignItems: "center",
};

const rateTextStyle: React.CSSProperties = {
  fontWeight: 600,
  color: "#173204",
};

const rateHighlightStyle: React.CSSProperties = {
  backgroundColor: "#e0e0e0",
  padding: "0.25rem 0.5rem",
  borderRadius: "6px",
  display: "inline-block",
  fontWeight: 600,
  fontSize: "0.9rem",
  color: "#173204",
};

const fieldStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
};

const labelStyle: React.CSSProperties = {
  fontWeight: 600,
  color: "#333",
};

const inputGroupStyle: React.CSSProperties = {
  display: "flex",
  borderRadius: "12px",
  border: "1px solid #ccc",
  overflow: "hidden",
  backgroundColor: "#fff",
  height: "72px",
  alignItems: "center",
};

const inputInsideGroupStyle: React.CSSProperties = {
  flex: 1,
  border: "none",
  padding: "0 1rem",
  fontSize: "1.5rem",
  outline: "none",
  backgroundColor: "#fff",
  color: "black",
  fontWeight: 600,
  height: "100%",
};

const currencyInsideGroupStyle: React.CSSProperties = {
  border: "none",
  backgroundColor: "#fff",
  padding: "0 1rem",
  cursor: "pointer",
  height: "100%",
  color: "black",
  fontSize: "1.5rem",
  fontWeight: 600,
};

const paymentMethodStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.5rem",
  backgroundColor: "#e6f0ff",
  borderRadius: "8px",
};

const changeButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#007bff",
  cursor: "pointer",
  fontWeight: 600,
};

// ----- Fees -----
const feesContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  backgroundColor: "#fff",
  padding: "0.75rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  color: "#666",
};

const feeRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  color: "#666",
  fontWeight: 500,
};

const dividerStyle: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #ccc",
  margin: "0.5rem 0",
};

// ----- Promo / Info Box -----
const infoBoxStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",     // <-- centers the 64x64 image vertically
  gap: "1rem",
  padding: "1rem",
  borderRadius: "8px",
  backgroundColor: "#CEE1C4",
};

const infoIconStyle: React.CSSProperties = {
  width: "64px",            // <-- updated size
  height: "64px",           // <-- updated size
  objectFit: "contain",
};

const infoTextContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
};

const infoBoldTextStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: "1rem",
  color: "#173204",
};

const infoGrayTextStyle: React.CSSProperties = {
  fontWeight: 500,
  fontSize: "0.875rem",
  color: "#666",
};

const infoLearnMoreStyle: React.CSSProperties = {
  fontWeight: 500,
  fontSize: "0.95rem",
  textDecoration: "underline",
  color: "#173205",         // <-- updated color
  cursor: "pointer",
};

const actionsStyle: React.CSSProperties = {
  marginTop: "1rem",
};

const sendButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem",
  backgroundColor: "#2a7a2a",
  color: "#fff",
  fontWeight: 600,
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
};

const flagStyle: React.CSSProperties = {
  width: 24,
  height: 24,
};