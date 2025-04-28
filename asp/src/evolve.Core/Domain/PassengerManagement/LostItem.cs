using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using evolve.Domain.TaxiManagement;

namespace evolve.Domain.PassengerManagement
{
    public class LostItem : FullAuditedEntity<Guid>
    {
        public string Description { get; set; } = string.Empty;
        public DateTime LostTime { get; set; }
        public Guid PassangerId { get; set; }
        public Guid RouteId { get; set; }

        [ForeignKey(nameof(RouteId))]
        public Route LostRoute { get; set; }

        [ForeignKey(nameof(PassangerId))]
        public Passenger Owner { get; set; }
        public bool IsReturned { get; set; }
    }
}
