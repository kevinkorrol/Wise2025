import { useNavigate } from "react-router-dom";
import SendMoneyCalculator from "../components/SendMoney";

export default function Transfer() {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <SendMoneyCalculator onSubmit={() => navigate("/history")} />
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center", // <-- horizontally center
  width: "100%",
  paddingTop: "2rem",        // optional spacing from top
};
