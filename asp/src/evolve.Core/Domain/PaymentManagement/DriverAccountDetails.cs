using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;
using evolve.Domain.DriverManagement;

namespace evolve.Domain.PaymentMangement
{
    public class DriverAccountDetails : FullAuditedEntity<Guid>
    {

        public Guid DriverId { get; set; }

        [JsonIgnore]
        public Driver Driver { get; set; }

        [Required]
        [StringLength(100)]
        public string BankName { get; set; }

        [Required]
        [StringLength(20)]
        public string BranchCode { get; set; }

        [Required]
        public string AccountNumber { get; set; }

        [Required]
        [StringLength(100)]
        public string AccountHolderName { get; set; }

        [Required]
        public string AccountType { get; set; }


    }
}
