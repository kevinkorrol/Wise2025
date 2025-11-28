import Fillmeter from "../components/Fillmeter";

export default function Transfer() {
  return (
    <div>
      <h1>Send Money</h1>

      <input type="number" placeholder="Enter amount" />

      <Fillmeter />

      <button>Continue</button>
    </div>
  );
}
