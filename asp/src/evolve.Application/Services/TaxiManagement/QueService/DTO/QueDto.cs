using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using evolve.Domain.TaxiManagement;
using evolve.Services.TaxiManagement.TaxiService.DTO;

namespace evolve.Services.TaxiManagement.QueService.DTO
{
    [AutoMap(typeof(Que))]

    public class QueDto : EntityDto<Guid>
    {
        public Guid LaneId { get; set; }
        public DateTime CreationDate { get; set; }
        public bool isOpen { get; set; }
        public List<TaxiDto> QuedTaxis { get; set; }
    }
}
