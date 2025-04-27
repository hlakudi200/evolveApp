using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using evolve.Domain.PassengerManagement;
using evolve.Domain.TaxiManagement;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace evolve.Domain.DriverManagement
{
    public class Driver : FullAuditedEntity<Guid>
    {
        [MaxLength(13)]
        [MinLength(9)]
        [RegularExpression(@"(^\d{13}$)|(^[A-Z]{1}\d{8}$)",
        ErrorMessage = "Must be either a 13-digit ID number or 1 letter followed by 8 digits (passport).")]
        public string IdentificationNumber { get; set; }

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

        [MaxLength(20)]
        public string LicenseNumber { get; set; } = string.Empty;

        [DataType(DataType.Date)]
        public DateTime? LicenseExpiryDate { get; set; }

        [MaxLength(20)]
        public string LicenseType { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;

        public Guid? TaxiAssociationId { get; set; }

        [ForeignKey(nameof(TaxiAssociationId))]
        public TaxiAssociation Association { get; set; }

        public List<Payment> Payments { get; set; }

    }
}
