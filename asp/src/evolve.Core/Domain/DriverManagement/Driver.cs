using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using evolve.Authorization.Users;
using evolve.Domain.PassengerManagement;
using evolve.Domain.PaymentMangement;
using evolve.Domain.TaxiManagement;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace evolve.Domain.DriverManagement
{
    public class Driver : FullAuditedEntity<Guid>
    {
        public long UserId { get; set; }
        public User User { get; set; }
        public virtual DriverAccountDetails AccountDetails { get; set; }
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
        public Guid TaxiAssociationId { get; set; }
        [ForeignKey(nameof(TaxiAssociationId))]
        public TaxiAssociation Association { get; set; }
        public List<Payment> Payments { get; set; }

    }
}
