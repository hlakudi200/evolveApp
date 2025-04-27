using System;
using System.Collections.Generic;
using Abp.Domain.Entities.Auditing;
using evolve.Domain.Adminstration;

namespace evolve.Domain.TaxiManagement
{
    public class TaxiRank : FullAuditedEntity<Guid>
    {
        public string Name { get; set; }
        public string Location { get; set; }
        public List<Lane> Lanes { get; set; }
        public List<Facility> Facilities { get; set; }
    }
}
