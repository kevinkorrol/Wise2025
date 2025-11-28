// src/api/transferApi.ts
export async function sendTransfer(data: any) {
  const response = await fetch("/api/backend/transaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit transfer");
  }

  return await response.json();
}
