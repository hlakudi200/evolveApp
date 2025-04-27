using System;
using Abp.Domain.Entities.Auditing;
using evolve.Domain.DriverManagement;

namespace evolve.Domain.TaxiManagement
{
    public class Taxi : FullAuditedEntity<Guid>
    {
        public string RegistrationNumber { get; set; } = string.Empty;
        public Driver Driver { get; set; }
        public int PassengerCapacity { get; set; }
        public Route AssignedRoute { get; set; }
        public bool IsFull { get; set; }
    }
}
