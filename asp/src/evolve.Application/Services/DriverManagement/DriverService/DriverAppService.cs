using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using Castle.MicroKernel.Util;
using evolve.Domain.DriverManagement;
using evolve.Services.DriverManagement.DriverService.DTO;
using evolve.Services.TaxiManagement.TaxiService.DTO;
using Microsoft.EntityFrameworkCore;

namespace evolve.Services.DriverManagement.DriverService
{
    public class DriverAppService : AsyncCrudAppService<Driver, DriverDto, Guid>, IDriverAppService
    {
        public DriverAppService(IRepository<Driver, Guid> repository) : base(repository)
        {
        }
        public override async Task<DriverDto> CreateAsync(DriverDto input)
        {
            try
            {
                var driver = ObjectMapper.Map<Driver>(input);
                await Repository.InsertAsync(driver);
                return ObjectMapper.Map<DriverDto>(driver);
            }
            catch (Exception ex)
            {

                throw new UserFriendlyException("Error creating driver", ex);
            }
        }
        //public async Task<List<TaxiDto>> GetAllInclude()
        //{
        //    var query = await Repository.GetAllAsync();

        //    var taxisWithDriverAndRoute = await query
        //        .Include(p => p.AssignedRoute)
        //        .Include(p => p.Driver)
        //        .ToListAsync();

        //    var results = taxisWithDriverAndRoute.Select(taxi => new TaxiDto
        //    {
        //        Id = taxi.Id,
        //        RegistrationNumber = taxi.RegistrationNumber,
        //        DriverId = taxi.DriverId,
        //        RouteId = taxi.RouteId,
        //        PassengerCapacity = taxi.PassengerCapacity,
        //        IsFull = taxi.IsFull,
        //        DriverFullName = taxi.Driver?.FullName ?? string.Empty,
        //        DriverLicenseNumber = taxi.Driver?.LicenseNumber ?? string.Empty,
        //        AssignedRoute = taxi.AssignedRoute
        //    }).ToList();

        //    return results;
        //}
        public async Task<List<DriverDto>> GetAllInclude()
        {
            var query = await Repository.GetAllAsync();
            var driverWithAssociation = await query.Include(p => p.Association).ToListAsync();

            var results = driverWithAssociation.Select(driver => new DriverDto
            {
                Id = driver.Id,
                IdentificationNumber = driver.IdentificationNumber,
                FirstName = driver.FirstName,
                SecondName = driver.SecondName,
                Surname = driver.Surname,
                FullName = driver.FullName,
                DateOfBirth = driver.DateOfBirth,
                Gender = driver.Gender,
                Email = driver.Email,
                CellPhoneNo = driver.CellPhoneNo,
                AddressLine1 = driver.AddressLine1,
                AddressLine2 = driver.AddressLine2,
                City = driver.City,
                Province = driver.Province,
                PostalCode = driver.PostalCode,
                Country = driver.Country,
                LicenseNumber = driver.LicenseNumber,
                LicenseExpiryDate = driver.LicenseExpiryDate,
                LicenseType = driver.LicenseType,
                IsActive = driver.IsActive,
                AssociationName = driver.Association?.Name,
                TaxiAssociationId = driver.TaxiAssociationId,
                Payments = driver.Payments
            }).ToList();

            return results;
        }

    }

}
