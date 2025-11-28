import { useNavigate } from "react-router-dom";
import SendMoneyCalculator from "../components/SendMoney";
import { sendTransfer } from "../api/transferApi";

export default function Transfer() {
  const navigate = useNavigate();

  const handleSubmit = async (formData: any) => {
    try {
      // Attempt to submit transfer to backend
      await sendTransfer(formData);
    } catch (error) {
      // Log error silently
      console.error("Transfer submission failed:", error);
    } finally {
      // Always redirect, regardless of backend success/failure
      navigate("/history");
    }
  };

  return (
    <div style={containerStyle}>
      <SendMoneyCalculator onSubmit={handleSubmit} />
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  paddingTop: "2rem",
};
