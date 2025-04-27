using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Abp.Domain.Entities.Auditing;
using evolve.Domain.TaxiManagement;

namespace evolve.Domain.DriverManagement
{
    public class Marshal : FullAuditedEntity<Guid>
    {
        [RegularExpression(@"^\d{13}$", ErrorMessage = "National ID number must be exactly 13 digits.")]
        public string NationalIdNo { get; set; }

        [MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [MaxLength(50)]
        public string SecondName { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Surname { get; set; } = string.Empty;

        [MaxLength(150)]
        public string FullName { get; set; } = string.Empty;

        [DataType(DataType.Date)]
        public DateTime? DateOfBirth { get; set; }

        [MaxLength(10)]
        public string Gender { get; set; } = string.Empty;

        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [RegularExpression(@"^0\d{9}$", ErrorMessage = "Cell phone number must start with 0 and be 10 digits.")]
        [MaxLength(10)]
        public string CellPhoneNo { get; set; } = string.Empty;

        [MaxLength(100)]
        public string AddressLine1 { get; set; } = string.Empty;

        [MaxLength(100)]
        public string AddressLine2 { get; set; } = string.Empty;

        [MaxLength(50)]
        public string City { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Province { get; set; } = string.Empty;

        [MaxLength(10)]
        public string PostalCode { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Country { get; set; } = string.Empty;
        public List<Route> ControlledRoutes { get; set; }
        public List<Driver> Members { get; set; }
    }
}
