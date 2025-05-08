using System;
using System.Collections.Generic;
using Abp.Domain.Entities.Auditing;
using evolve.Domain.DriverManagement;

namespace evolve.Domain.TaxiManagement
{
    public class TaxiAssociation : FullAuditedEntity<Guid>
    {
        public string Name { get; set; }
        public List<Route> ControlledRoutes { get; set; }
        public List<Driver> Members { get; set; }
    }
}
