using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using evolve.Domain.DriverManagement;
using evolve.Domain.TaxiManagement;

namespace evolve.Services.TaxiManagement.TaxiAssociationService.DTO
{
    [AutoMap(typeof(TaxiAssociation))]
    public class TaxiAssociationDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public List<Route> ControlledRoutes { get; set; }
        public List<Driver> Members { get; set; }
    }
}
