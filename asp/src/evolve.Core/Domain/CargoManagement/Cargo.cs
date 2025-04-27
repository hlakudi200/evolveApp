using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using evolve.Domain.DriverManagement;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace evolve.Domain.CargoManagement
{
    public class Cargo : FullAuditedEntity<Guid>
    {
        public string Description { get; set; } = string.Empty;
        public Guid SenderId { get; set; }

        [ForeignKey(nameof(SenderId))]
        public Sender Sender { get; set; }
        public Guid RecepeientId { get; set; }

        [ForeignKey(nameof(RecepeientId))]
        public Recepient Recipient { get; set; }
        public string CollectionCode { get; set; } = string.Empty;
        public float Fee { get; set; }
    }
}
