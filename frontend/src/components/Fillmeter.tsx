type FillMeterProps = {
  progress: number; // 0–100
};

export default function Fillmeter({ progress }: FillMeterProps) {
  return (
    <div style={{ border: "1px solid #ccc", width: 200 }}>
      <div
        style={{
          width: `${progress}%`,
          height: 10,
          background: "green",
          transition: "0.3s"
        }}
      />
    </div>
  );
}
