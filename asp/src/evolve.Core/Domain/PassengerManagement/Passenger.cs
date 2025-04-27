using System;
using System.ComponentModel.DataAnnotations;
using Abp.Domain.Entities.Auditing;

namespace evolve.Domain.PassengerManagement
{
    public class Passenger : FullAuditedEntity<Guid>
    {
        [MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [MaxLength(50)]
        public string SecondName { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Surname { get; set; } = string.Empty;

        [RegularExpression(@"^0\d{9}$", ErrorMessage = "Cell phone number must start with 0 and be 10 digits.")]
        [MaxLength(10)]
        public string CellPhoneNo { get; set; } = string.Empty;

        [RegularExpression(@"^0\d{9}$", ErrorMessage = "Cell phone number must start with 0 and be 10 digits.")]
        [MaxLength(10)]
        public string NextOfKinCellPhoneNo { get; set; } = string.Empty;
        public string Destination { get; set; } = string.Empty;
        public float FareAmount { get; set; }

    }
}
