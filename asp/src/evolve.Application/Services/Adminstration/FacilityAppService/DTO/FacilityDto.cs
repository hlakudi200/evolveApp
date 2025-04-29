using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using evolve.Domain.Adminstration;

namespace evolve.Services.Adminstration.FacilityAppService.DTO
{
    [AutoMap(typeof(Facility))]
    public class FacilityDto : EntityDto<Guid>
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Unit { get; set; }
        public bool IsOperational { get; set; }
    }
}
