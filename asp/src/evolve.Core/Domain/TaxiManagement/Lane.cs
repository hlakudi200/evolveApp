using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;

namespace evolve.Domain.TaxiManagement
{
    public class Lane : FullAuditedEntity<Guid>
    {
        public Guid RouteId { get; set; }

        [ForeignKey(nameof(RouteId))]
        public Route DesignatedRoute { get; set; }
        public int Capacity { get; set; }
        public List<Que> Queus { get; set; }
    }
}
