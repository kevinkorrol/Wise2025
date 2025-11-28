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
  } else {
    console.log("POST REQUEST SUCCESS!");
  }
}

export async function getTransferID() {
  const response = await fetch("/api/backend/transaction?user_id=1", {
    method: "GET"
  });

  if (!response.ok) {
    throw new Error("Failed to submit transfer");
  }

  let transfer = await response.json();
  return transfer[0]["ID"]
}
type Currency = 'EUR' | 'DOLLAR'

type PoolResponse = {
  ID: number
  CurrentAmount: { Sum: number; Currency: Currency }
  MinimumAmount: { Sum: number; Currency: Currency }
  TargetCurrency: Currency
  StartTime: string
  EstimatedCompletion?: string
}


export async function getPool() {
  let ID = await getTransferID();

  const response = await fetch(`/api/backend/batch?transaction_id=${ID}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to submit transfer");
  }

  return await response.json() as PoolResponse;
}