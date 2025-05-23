﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using evolve.Authorization.Users;
using evolve.Domain.DriverManagement;
using evolve.Domain.TaxiManagement;
using evolve.Services.DriverManagement.DriverService.DTO;
using evolve.Services.TaxiManagement.RoutesServices.DTO;

namespace evolve.Services.TaxiManagement.TaxiService.DTO
{
    [AutoMap(typeof(Taxi))]

    public class TaxiDto : EntityDto<Guid>
    {
        public string RegistrationNumber { get; set; } = string.Empty;
        public Guid DriverId { get; set; }
        public Guid RouteId { get; set; }

        public int PassengerCapacity { get; set; }
        public bool IsFull { get; set; }
        public bool IsDispatched { get; set; } = false;
        public DateTime? DispatchTime { get; set; }
        public DateTime? ArrivalTime { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public List<User> Passangers { get; set; }
        public string DriverFullName { get; set; }
        public string DriverLicenseNumber { get; set; }

        public Route AssignedRoute { get; set; }
    }
}
