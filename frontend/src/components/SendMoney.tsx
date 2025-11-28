import { useState } from "react";

type Currency = "USD" | "GBP" | "EUR"; // extend as needed

export default function SendMoney() {
  const [amount, setAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState<Currency>("GBP");
  const [toCurrency, setToCurrency] = useState<Currency>("USD");
  const [converted, setConverted] = useState<number | null>(null);

  const exchangeRate: Record<string, number> = {
    "GBP-USD": 1.25,
    "GBP-EUR": 1.14,
    "USD-GBP": 0.80,
    "USD-EUR": 0.91,
    "EUR-GBP": 0.88,
    "EUR-USD": 1.10,
  };

  const calculate = () => {
    const key = `${fromCurrency}-${toCurrency}`;
    setConverted(amount * (exchangeRate[key] || 1));
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 24, borderRadius: 8, maxWidth: 400 }}>
      <h2>Send Money</h2>

      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder="0.00"
          style={{ marginLeft: 8 }}
        />
      </label>

      <div style={{ marginTop: 12 }}>
        <label>
          From:
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value as Currency)}
            style={{ marginLeft: 8 }}
          >
            <option value="GBP">GBP</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </label>
      </div>

      <div style={{ marginTop: 12 }}>
        <label>
          To:
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value as Currency)}
            style={{ marginLeft: 8 }}
          >
            <option value="GBP">GBP</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </label>
      </div>

      <button onClick={calculate} style={{ marginTop: 16 }}>
        Calculate
      </button>

      {converted !== null && (
        <p style={{ marginTop: 12 }}>
          {amount} {fromCurrency} → {converted.toFixed(2)} {toCurrency}
        </p>
      )}
    </div>
  );
}
