// src/components/SendMoney.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usaFlag from "../assets/flag-usa.svg";
import zaFlag from "../assets/flag-za.svg";
import CalculateFee2 from "./calculateFee2";

export default function SendMoney({ onSubmit }: { onSubmit: (data: any) => void }) {
  const navigate = useNavigate();
  const [sendAmount, setSendAmount] = useState("25000");
  const [receiveAmount, setReceiveAmount] = useState("425509.57");
  const [sendCurrency] = useState("USD");
  const [receiveCurrency] = useState("ZAR");
  const exchangeRate = 17.1214;

  const handleSendMoney = () => {
    if (onSubmit) {
      const payload = {
        sendAmount,
        receiveAmount,
        sendCurrency,
        receiveCurrency,
        exchangeRate,
      };
      onSubmit(payload);      // use parent page’s action
    } else {
      navigate("/transfer"); // default behavior
    }
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
        <div style={paymentBoxStyle}>
            <div style={paymentLeftStyle}>
            <span style={paymentEmojiStyle}>💰</span>
            <span>Pooling</span>
            </div>

            <button style={changePaymentButtonStyle}>
            Change &gt;
            </button>
        </div>
        </div>

      {/* Fee Calculator (CalculateFee2) inserted around line ~100 */}
      <div style={{ marginTop: "1rem" }}>
        <CalculateFee2 amount={sendAmount} />
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

const paymentBoxStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  borderRadius: "12px",
  padding: "0 1rem",
  height: "72px",                // matches input boxes
};

const paymentLeftStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  color: "black",
  fontWeight: 600,
  fontSize: "1rem",
};


const changePaymentButtonStyle: React.CSSProperties = {
  padding: "0.35rem 0.75rem",
  backgroundColor: "#e0e0e0",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "0.9rem",
  color: "black",
};



const paymentEmojiStyle: React.CSSProperties = {
  fontSize: "1.25rem",
  display: "flex",
  alignItems: "center",
};
