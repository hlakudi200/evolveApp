using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Abp.Domain.Entities.Auditing;

namespace evolve.Domain.TaxiManagement
{
    public class Que : FullAuditedEntity<Guid>
    {
        public Guid LaneId { get; set; }

        [ForeignKey(nameof(LaneId))]
        [JsonIgnore]
        public Lane Lane { get; set; }
        public DateTime CreationDate { get; set; }
        public bool isOpen { get; set; }
        public List<Taxi> QuedTaxis { get; set; }
    }
}
