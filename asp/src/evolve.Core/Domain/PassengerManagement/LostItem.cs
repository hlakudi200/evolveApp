using System;
using Abp.Domain.Entities.Auditing;
using evolve.Domain.TaxiManagement;

namespace evolve.Domain.PassengerManagement
{
    public class LostItem : FullAuditedEntity<Guid>
    {
        public string Description { get; set; } = string.Empty;
        public DateTime LostTime { get; set; }
        public Route LostRoute { get; set; }
        public Passenger Owner { get; set; }
        public bool IsReturned { get; set; }
    }
}
