using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;
using evolve.Domain.DriverManagement;

namespace evolve.Domain.PaymentManagement
{
    public class PaymentQrCode : FullAuditedEntity<Guid>
    {
        public Guid DriverId { get; set; }
        public Driver Driver { get; set; }
        public string QrCodeContent { get; set; }
        public string QrCodeImageUrl { get; set; }
        public DateTime GeneratedDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public bool IsActive { get; set; }

    }
}
