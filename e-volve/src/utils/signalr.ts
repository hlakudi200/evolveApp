
import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;

export const startTaxiHubConnection = async (
  onTaxiUpdated: (taxi: any) => void
) => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:44311/taxihub") 
    .withAutomaticReconnect()
    .build();

  connection.on("ReceiveTaxiUpdate", (taxi) => {
    console.log("Taxi updated:", taxi);
    onTaxiUpdated(taxi);
  });

  try {
    await connection.start();
    console.log("✅ SignalR connected to TaxiHub");
  } catch (err) {
    console.error("❌ SignalR connection error:", err);
  }
};

export const stopTaxiHubConnection = async () => {
  if (connection) {
    await connection.stop();
  }
};
