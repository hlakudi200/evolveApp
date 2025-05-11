using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using evolve.Domain.DriverManagement;
using evolve.Domain.PassengerManagement;


namespace evolve.Services.PaymentManagement.PaymentAppService.DTO
{
    [AutoMap(typeof(Payment))]

    public class PaymentDto : EntityDto<Guid>
    {
        public Guid DriverId { get; set; }

        [JsonIgnore]
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
    }
}
