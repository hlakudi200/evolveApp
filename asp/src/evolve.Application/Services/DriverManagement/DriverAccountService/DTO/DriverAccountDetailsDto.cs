using System;
using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using evolve.Domain.DriverManagement;
using evolve.Domain.PaymentMangement;

namespace evolve.Services.DriverManagement.DriverAccountService.DTO
{
    [AutoMap(typeof(DriverAccountDetails))]
    public class DriverAccountDetailsDto : EntityDto<Guid>
    {
        public Guid DriverId { get; set; }

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
