using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using evolve.Domain.TaxiManagement;
using evolve.Services.TaxiManagement.RoutesServices.DTO;

namespace evolve.Services.TaxiManagement.TaxiAssociationService.DTO
{
    [AutoMap(typeof(TaxiAssociation))]
    public class TaxiAssociationDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public List<RouteDto> ControlledRoutes { get; set; }
        public List<MemberDto> Members { get; set; }
    }
}
