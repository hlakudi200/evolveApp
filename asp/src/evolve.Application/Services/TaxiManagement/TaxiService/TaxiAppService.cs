using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.Events.Bus;
using evolve.Domain.TaxiManagement;
using evolve.Domain.TaxiManagement.Events;
using evolve.Services.TaxiManagement.TaxiService.DTO;
using Microsoft.EntityFrameworkCore;


namespace evolve.Services.TaxiManagement.TaxiService
{
    public class TaxiAppService : AsyncCrudAppService<Taxi, TaxiDto, Guid>, ITaxiAppService
    {
        public IEventBus _eventBus { get; set; }
        public TaxiAppService(IRepository<Taxi, Guid> repository, IEventBus eventBus) : base(repository)
        {
            _eventBus = eventBus;
        }
        public async Task<List<TaxiDto>> GetAllInclude()
        {
            var query = await Repository.GetAllAsync();

            var taxisWithDriverAndRoute = await query
                .Include(p => p.AssignedRoute)
                .Include(p => p.Driver)
                .ToListAsync();

            var results = taxisWithDriverAndRoute.Select(taxi => new TaxiDto
            {
                Id = taxi.Id,
                RegistrationNumber = taxi.RegistrationNumber,
                DriverId = taxi.DriverId,
                RouteId = taxi.RouteId,
                PassengerCapacity = taxi.PassengerCapacity,
                IsFull = taxi.IsFull,
                DriverFullName = taxi.Driver?.FullName ?? string.Empty,
                DriverLicenseNumber = taxi.Driver?.LicenseNumber ?? string.Empty,
                AssignedRoute = taxi.AssignedRoute,
                Latitude = taxi.Latitude,
                Longitude = taxi.Longitude,
            }).ToList();

            return results;
        }


        public async Task<TaxiDto> GetTaxiByDriverId(Guid driverId)
        {
            var taxi = await Repository
                .GetAll()
                .Include(t => t.Driver)
                .Include(t => t.AssignedRoute)
                .FirstOrDefaultAsync(t => t.DriverId == driverId);

            if (taxi == null)
            {
                return null;
            }

            return new TaxiDto
            {
                Id = taxi.Id,
                RegistrationNumber = taxi.RegistrationNumber,
                DriverId = taxi.DriverId,
                RouteId = taxi.RouteId,
                PassengerCapacity = taxi.PassengerCapacity,
                IsFull = taxi.IsFull,
                DriverFullName = taxi.Driver?.FullName ?? string.Empty,
                DriverLicenseNumber = taxi.Driver?.LicenseNumber ?? string.Empty,
                AssignedRoute = taxi.AssignedRoute,
                Latitude = taxi.Latitude,
                Longitude = taxi.Longitude,

            };
        }

        public override async Task<TaxiDto> GetAsync(EntityDto<Guid> input)
        {
            var taxi = await Repository
                .GetAll()
                .Include(t => t.Driver)
                .Include(t => t.AssignedRoute)
                .FirstOrDefaultAsync(t => t.Id == input.Id);

            if (taxi == null)
            {
                throw new EntityNotFoundException(typeof(Taxi), input.Id);
            }

            return new TaxiDto
            {
                Id = taxi.Id,
                RegistrationNumber = taxi.RegistrationNumber,
                DriverId = taxi.DriverId,
                RouteId = taxi.RouteId,
                PassengerCapacity = taxi.PassengerCapacity,
                IsFull = taxi.IsFull,
                DriverFullName = taxi.Driver?.FullName ?? string.Empty,
                DriverLicenseNumber = taxi.Driver?.LicenseNumber ?? string.Empty,
                AssignedRoute = taxi.AssignedRoute,
                Latitude = taxi.Latitude,
                Longitude = taxi.Longitude,
            };
        }

        public async Task<TaxiDto> UpdateTaxiRealtime(TaxiDto input)
        {
            var taxi = await Repository.GetAsync(input.Id);
            ObjectMapper.Map(input, taxi);
            var updatedTaxi = await Repository.UpdateAsync(taxi);

            // Trigger SignalR event through event bus
            await _eventBus.TriggerAsync(new TaxiUpdatedEvent(updatedTaxi));

            return ObjectMapper.Map<TaxiDto>(updatedTaxi);
        }
    }
}
