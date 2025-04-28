using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using evolve.Domain.DriverManagement;

namespace evolve.Domain.TaxiManagement
{
    public class Taxi : FullAuditedEntity<Guid>
    {
        public string RegistrationNumber { get; set; } = string.Empty;
        public Guid DriverId { get; set; }
        public Guid RouteId { get; set; }
        [ForeignKey(nameof(DriverId))]
        public Driver Driver { get; set; }
        public int PassengerCapacity { get; set; }

        [ForeignKey(nameof(RouteId))]
        public Route AssignedRoute { get; set; }
        public bool IsFull { get; set; }
    }
}
