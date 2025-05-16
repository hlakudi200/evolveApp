import { ITaxi } from "@/providers/interfaces";
import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;

export const startTaxiHubConnection = async (
    onTaxiUpdated: (taxi: ITaxi) => void,
    onTaxiListUpdated?: (taxis: ITaxi[]) => void
) => {
    connection = new signalR.HubConnectionBuilder()
        .withUrl("https://https://evolveapp.onrender.com/taxihub")
        .withAutomaticReconnect()
        .build();

    // Handle individual taxi updates
    connection.on("ReceiveTaxiUpdate", (taxi) => {

        onTaxiUpdated(taxi);
    });

    // Handle list of taxis updates (for "Show All" mode)
    if (onTaxiListUpdated) {
        connection.on("ReceiveTaxiListUpdate", (taxis) => {
            onTaxiListUpdated(taxis as ITaxi[]);
        });
    }

    try {
        await connection.start();
        console.log("✅ SignalR connected to TaxiHub");
    } catch (err) {
        console.error("❌ SignalR connection error:", err);
    }
};

export const stopTaxiHubConnection = async () => {
    if (connection) {
        try {
            await connection.stop();
            console.log("SignalR connection stopped");
        } catch (err) {
            console.error("Error stopping SignalR connection:", err);
        }
    }
};