using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using evolve.Domain.Adminstration;
using evolve.Domain.TaxiManagement;
using evolve.Services.TaxiManagement.LaneService.DTO;

namespace evolve.Services.TaxiManagement.TaxiRankService.DTO
{
    [AutoMap(typeof(TaxiRank))]
    public class TaxiRankDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Location { get; set; }
        public List<LaneDto> Lanes { get; set; }
        public List<Facility> Facilities { get; set; }
    }
}
