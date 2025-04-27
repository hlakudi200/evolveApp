using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using evolve.Domain.TaxiManagement;
using evolve.Services.DriverManagement.DriverService.DTO;
using evolve.Services.TaxiManagement.RoutesServices.DTO;

namespace evolve.Services.TaxiManagement.TaxiService.DTO
{
    [AutoMap(typeof(Taxi))]

    public class TaxiDto : EntityDto<Guid>
    {
        public string RegistrationNumber { get; set; } = string.Empty;
        public DriverDto Driver { get; set; }
        public int PassengerCapacity { get; set; }
        public RouteDto AssignedRoute { get; set; }
        public bool IsFull { get; set; }
    }
}
