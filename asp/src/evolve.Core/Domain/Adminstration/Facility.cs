using System;
using Abp.Domain.Entities.Auditing;

namespace evolve.Domain.Adminstration
{
    public class Facility : FullAuditedEntity<Guid>
    {
        public string Type { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public bool IsOperational { get; set; }
    }
}
