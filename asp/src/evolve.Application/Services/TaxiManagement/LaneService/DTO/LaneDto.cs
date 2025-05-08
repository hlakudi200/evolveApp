using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using evolve.Domain.TaxiManagement;
using evolve.Services.TaxiManagement.QueService.DTO;
using evolve.Services.TaxiManagement.RoutesServices.DTO;
using evolve.Services.TaxiManagement.TaxiService.DTO;

namespace evolve.Services.TaxiManagement.LaneService.DTO
{
    [AutoMap(typeof(Lane))]
    public class LaneDto : EntityDto<Guid>
    {
        public Guid RouteId { get; set; }
        public RouteDto DesignatedRoute { get; set; }
        public int Capacity { get; set; }
        public List<QueDto> Queus { get; set; }
    }
}
