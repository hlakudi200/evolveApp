using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using evolve.Domain.DriverManagement;
using evolve.Domain.PassengerManagement;

namespace evolve.Services.DriverManagement.DriverService.DTO
{
    [AutoMap(typeof(Driver))]
    public class DriverDto : EntityDto<Guid>
    {
        public long UserId { get; set; }
        public string UserName { get; set; }
        public string IdentificationNumber { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string SecondName { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string CellPhoneNo { get; set; } = string.Empty;
        public string AddressLine1 { get; set; } = string.Empty;
        public string AddressLine2 { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Province { get; set; } = string.Empty;
        public string PostalCode { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string LicenseNumber { get; set; } = string.Empty;
        public DateTime LicenseExpiryDate { get; set; }
        public string LicenseType { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public string AssociationName { get; set; }
        public Guid TaxiAssociationId { get; set; }
        public List<Payment> Payments { get; set; }
    }
}
