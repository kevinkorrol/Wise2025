import { useNavigate } from "react-router-dom";
import SendMoneyCalculator from "../components/SendMoney";
import { sendTransfer } from "../api/transferApi";

export default function Transfer() {
  const navigate = useNavigate();

  const handleSubmit = async (formData: any) => {
    try {
      await sendTransfer(formData);
    } catch (error) {
      console.error("Transfer failed silently:", error);
      // no alert, no blockage
    }

    // Always redirect
    navigate("/history");
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
