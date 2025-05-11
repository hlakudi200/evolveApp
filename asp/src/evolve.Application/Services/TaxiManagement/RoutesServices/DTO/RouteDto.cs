using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using evolve.Domain.TaxiManagement;


namespace evolve.Services.TaxiManagement.RoutesServices.DTO
{
    [AutoMap(typeof(Route))]
    public class RouteDto : EntityDto<Guid>
    {
        public string Origin { get; set; } = string.Empty;
        public string Destination { get; set; } = string.Empty;
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public float FareAmount { get; set; }
        public int EstimatedTravelTime { get; set; }
    }
}
