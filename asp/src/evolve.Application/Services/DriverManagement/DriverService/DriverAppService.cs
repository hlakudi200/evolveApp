using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using evolve.Authorization.Users;
using evolve.Domain.DriverManagement;
using evolve.Services.DriverManagement.DriverService.DTO;
using evolve.Services.DriverManagement.DriverService.Helpers;
using Microsoft.EntityFrameworkCore;

namespace evolve.Services.DriverManagement.DriverService
{
    public class DriverAppService : AsyncCrudAppService<Driver, DriverDto, Guid>, IDriverAppService
    {
        private readonly UserManager _userManager;
        private readonly DriverManager _driverManager;
        public DriverAppService(IRepository<Driver, Guid> repository, UserManager userManager, DriverManager driverManager) : base(repository)
        {
            _userManager = userManager;
            _driverManager = driverManager;
        }
        public async Task<DriverDto> CreateDriverAsync(DriverRequesDto input)
        {
            try
            {
                string password = PasswordGenerator.GeneratePassword();
                string username = input.FirstName + input.SecondName;
                Driver driver = await _driverManager.CreateDriverAsync(
                    username,
                    password,
                    input.IdentificationNumber,
                    input.FirstName,
                    input.SecondName,
                    input.Surname,
                    input.DateOfBirth,
                    input.Gender,
                    input.Email,
                    input.CellPhoneNo,
                    input.AddressLine1,
                    input.AddressLine2,
                    input.City,
                    input.Province,
                    input.PostalCode,
                    input.Country,
                    input.LicenseNumber,
                    input.LicenseExpiryDate,
                    input.LicenseType,
                    input.IsActive,
                    input.TaxiAssociationId
                     );
                await Repository.InsertAsync(driver);
                return ObjectMapper.Map<DriverDto>(driver);
            }
            catch (Exception ex)
            {

                throw new UserFriendlyException("Error creating driver", ex);
            }
        }

        public override async Task<DriverDto> GetAsync(EntityDto<Guid> input)
        {
            var driver = await Repository
                .FirstOrDefaultAsync(e => e.Id == input.Id);

            var user = await _userManager.GetUserByIdAsync(driver.UserId);

            if (driver == null && user == null)
            {
                throw new UserFriendlyException("Employee not found");
            }

            var employeeDto = new DriverDto
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
            };

            return employeeDto;
        }
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
