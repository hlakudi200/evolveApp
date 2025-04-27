using System;
using System.Collections.Generic;
using Abp.Domain.Entities.Auditing;
using evolve.Domain.TaxiManagement;

namespace evolve.Domain.Adminstration
{
    public class LocalAuthority : FullAuditedEntity<Guid>
    {
        public string Name { get; set; } = string.Empty;
        public string Jurisdiction { get; set; } = string.Empty;
        public List<TaxiRank> ManagedRanks { get; set; }
    }
}

