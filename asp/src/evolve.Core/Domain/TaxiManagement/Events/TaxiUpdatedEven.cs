using Abp.Events.Bus.Entities;

namespace evolve.Domain.TaxiManagement.Events
{

    public class TaxiUpdatedEvent : EntityEventData<Taxi>
    {
        public TaxiUpdatedEvent(Taxi taxi) : base(taxi) { }
    }

}
