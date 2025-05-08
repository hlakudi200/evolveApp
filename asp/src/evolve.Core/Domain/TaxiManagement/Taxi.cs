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

        [ForeignKey(nameof(RouteId))]
        public Route AssignedRoute { get; set; }

        public int PassengerCapacity { get; set; }

        public bool IsFull { get; set; }

        // New fields for dispatch and arrival tracking
        public bool IsDispatched { get; set; } = false;

        public DateTime? DispatchTime { get; set; }

        public DateTime? ArrivalTime { get; set; }

        public string Status { get; set; }
    }


}
