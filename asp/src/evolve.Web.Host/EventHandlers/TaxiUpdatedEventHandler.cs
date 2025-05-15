using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Abp.Events.Bus.Handlers;
using Abp.ObjectMapping;
using evolve.Domain.TaxiManagement.Events;
using evolve.Services.TaxiManagement.TaxiService.DTO;
using evolve.Web.Host.Hubs;
using Microsoft.AspNetCore.SignalR;
namespace evolve.Web.Host.EventHandlers
{
    public class TaxiUpdatedEventHandler : IAsyncEventHandler<TaxiUpdatedEvent>
    {
        private readonly IHubContext<TaxiHub> _hubContext;
        private readonly IObjectMapper _objectMapper;
        public TaxiUpdatedEventHandler(
          IHubContext<TaxiHub> hubContext,
          IObjectMapper objectMapper)
        {
            _hubContext = hubContext;
            _objectMapper = objectMapper;

            Debug.WriteLine("ConstructedEvent");
        }


        public async Task HandleEventAsync(TaxiUpdatedEvent eventData)
        {
            Debug.WriteLine("TaxiUpdatedEventHandler triggered");
            var taxiDto = _objectMapper.Map<TaxiDto>(eventData.Entity);
            await _hubContext.Clients.All.SendAsync("ReceiveTaxiUpdate", taxiDto);
        }

    }
}
