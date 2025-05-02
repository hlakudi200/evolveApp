using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using evolve.Domain.TaxiManagement;
using evolve.Services.TaxiManagement.TaxiService.DTO;
using Microsoft.EntityFrameworkCore;

namespace evolve.Services.TaxiManagement.TaxiService
{
    public class TaxiAppService : AsyncCrudAppService<Taxi, TaxiDto, Guid>, ITaxiAppService
    {
        public TaxiAppService(IRepository<Taxi, Guid> repository) : base(repository)
        {
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
                AssignedRoute = taxi.AssignedRoute
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
                AssignedRoute = taxi.AssignedRoute
            };
        }

    }
}
