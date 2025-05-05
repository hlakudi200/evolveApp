using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.AutoMapper;
using evolve.Domain.DriverManagement;

namespace evolve.Services.DriverManagement.DriverService.DTO
{
    [AutoMap(typeof(Driver))]

    public class DriverRequesDto
    {
        public string IdentificationNumber { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string SecondName { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; } = string.Empty; // Could be "Male", "Female", etc.
        public string Email { get; set; } = string.Empty;
        public string CellPhoneNo { get; set; } = string.Empty;
        public string AddressLine1 { get; set; } = string.Empty;
        public string AddressLine2 { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Province { get; set; } = string.Empty; // e.g., "Gauteng"
        public string PostalCode { get; set; } = string.Empty;
        public string Country { get; set; } = "South Africa";
        public string LicenseNumber { get; set; } = string.Empty;
        public DateTime LicenseExpiryDate { get; set; }
        public string LicenseType { get; set; } = string.Empty; // e.g., "Code 10"
        public bool IsActive { get; set; } = true;
        public Guid TaxiAssociationId { get; set; }
    }
}
