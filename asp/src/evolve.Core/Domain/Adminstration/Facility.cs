using System;
using Abp.Domain.Entities.Auditing;

namespace evolve.Domain.Adminstration
{
    public class Facility : FullAuditedEntity<Guid>
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Unit { get; set; }
        public bool IsOperational { get; set; }
    }
}
