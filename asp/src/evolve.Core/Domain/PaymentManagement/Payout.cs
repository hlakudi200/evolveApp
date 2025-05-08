using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;
using evolve.Domain.DriverManagement;
using evolve.Domain.PassengerManagement;

namespace evolve.Domain.PaymentManagement
{
    public class Payout : FullAuditedEntity<Guid>
    {
        public Guid DriverId { get; set; }
        public Driver Driver { get; set; }

        [Required]
        public decimal TotalAmount { get; set; }

        [Required]
        public decimal ServiceFeeAmount { get; set; }

        [Required]
        public decimal NetPayoutAmount { get; set; }

        public DateTime ScheduledDate { get; set; }

        public DateTime? ProcessedDate { get; set; }

        // Status like "Scheduled", "Processing", "Completed", "Failed"
        [Required]
        public string Status { get; set; }

        // Reference from bank or payment provider
        public string BankReference { get; set; }

        // Payments included in this payout
        public virtual ICollection<Payment> Payments { get; set; }

        // Period this payout covers
        public DateTime PeriodStart { get; set; }

        public DateTime PeriodEnd { get; set; }
    }
}
