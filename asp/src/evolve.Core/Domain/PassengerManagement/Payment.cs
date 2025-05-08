using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using evolve.Domain.DriverManagement;
using evolve.Domain.PaymentManagement;


namespace evolve.Domain.PassengerManagement
{
    public class Payment : FullAuditedEntity<Guid>
    {
        public Guid DriverId { get; set; }
        public Driver Driver { get; set; }
        [Required]
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        [Required]
        public string TransactionReference { get; set; }
        [Required]
        public string GatewayResponseCode { get; set; }
        public string GatewayTransactionId { get; set; }
        [Required]
        public string Status { get; set; }
        public Guid? PayoutId { get; set; }
        public Payout Payout { get; set; }
    }
}
