using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using evolve.Domain.DriverManagement;

namespace evolve.Domain.PassengerManagement
{
    public class Payment : FullAuditedEntity<Guid>
    {
        public float Amount { get; set; }
        public Guid DriverId { get; set; }
        public Guid? PassangerId { get; set; }
        public Guid? SenderId { get; set; }

        [ForeignKey(nameof(PassangerId))]
        public Passenger Passenger { get; set; }

        [ForeignKey(nameof(SenderId))]
        public Sender Sender { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
