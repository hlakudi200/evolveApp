using System;
using Abp.Domain.Entities.Auditing;

namespace evolve.Domain.TaxiManagement
{
    public class Route : FullAuditedEntity<Guid>
    {
        public string Origin { get; set; } = string.Empty;
        public string Destination { get; set; } = string.Empty;
        public float FareAmount { get; set; }
        public int EstimatedTravelTime { get; set; }
    }
}
