using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;
using evolve.Domain.DriverManagement;

namespace evolve.Domain.PaymentMangement
{
    public class DriverAccountDetails : FullAuditedEntity<Guid>
    {

        public Guid DriverId { get; set; }
        public Driver Driver { get; set; }

        [Required]
        [StringLength(100)]
        public string BankName { get; set; }

        [Required]
        [StringLength(20)]
        public string BranchCode { get; set; }

        [Required]
        public string AccountNumberEncrypted { get; set; }

        public string BankGroupId { get; set; }

        [Required]
        [StringLength(100)]
        public string AccountHolderName { get; set; }

        [Required]
        public string AccountType { get; set; }


    }
}
