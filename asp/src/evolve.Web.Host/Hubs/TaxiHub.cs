using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace evolve.Web.Host.Hubs
{
    public class TaxiHub : Hub
    {
        // Called by server to notify all clients of updated taxi list
        public async Task SendTaxiUpdate(object taxi)
        {
            await Clients.All.SendAsync("ReceiveTaxiUpdate", taxi);
        }

        public async Task SendTaxiListUpdate(List<object> taxis)
        {
            await Clients.All.SendAsync("ReceiveTaxiListUpdate", taxis);
        }

        public async Task SendTaxiByIdUpdate(object taxi)
        {
            await Clients.All.SendAsync("ReceiveTaxiByIdUpdate", taxi);
        }
    }
}
