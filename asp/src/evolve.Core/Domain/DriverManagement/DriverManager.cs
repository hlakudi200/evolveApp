using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using evolve.Authorization.Users;
using evolve.Domain.TaxiManagement;
using Microsoft.AspNetCore.SignalR.Protocol;

namespace evolve.Domain.DriverManagement
{
    public class DriverManager : DomainService
    {
        private readonly UserManager _userManager;
        private readonly IRepository<Driver, Guid> _driverRepository;

        public DriverManager(UserManager userManager, IRepository<Driver, Guid> driverRepository)
        {
            _driverRepository = driverRepository;
            _userManager = userManager;
        }
        public async Task<Driver> CreateDriverAsync(
            string Username,
            string Password,
            string IdentificationNumber,
            string FirstName,
            string SecondName,
            string Surname,
            DateTime DateOfBirth,
            string Gender,
            string Email,
            string CellPhoneNo,
            string AddressLine1,
            string AddressLine2,
            string City,
            string Province,
            string PostalCode,
            string Country,
            string LicenseNumber,
           DateTime LicenseExpiryDate,
           string LicenseType,
           bool IsActive,
           Guid TaxiAssociationId
            )
        {
            var user = new User
            {
                Name = FirstName,
                Surname = Surname,
                EmailAddress = Email,
                UserName = Username,
            };

            var userCreationResult = await _userManager.CreateAsync(user, Password);
            if (!userCreationResult.Succeeded)
            {
                throw new UserFriendlyException("User creation failed");
            }

            await _userManager.AddToRoleAsync(user, "DRIVER");



            var driver = new Driver
            {

                UserId = user.Id,
                IdentificationNumber = IdentificationNumber,
                FirstName = FirstName,
                SecondName = SecondName,
                Surname = Surname,
                FullName = FirstName + " " + SecondName + " " + Surname,
                DateOfBirth = DateOfBirth,
                Gender = Gender,
                Email = Email,
                CellPhoneNo = CellPhoneNo,
                AddressLine1 = AddressLine1,
                AddressLine2 = AddressLine2,
                City = City,
                Province = Province,
                PostalCode = PostalCode,
                Country = Country,
                LicenseNumber = LicenseNumber,
                LicenseExpiryDate = LicenseExpiryDate,
                IsActive = IsActive,
                TaxiAssociationId = TaxiAssociationId

            };

            await _driverRepository.InsertAsync(driver);


            return driver;

        }


        public async Task<Driver> UpdateDriverAsync(Guid driverId, Driver updatedData)
        {
            var existingDriver = await _driverRepository.FirstOrDefaultAsync(driverId);
            if (existingDriver == null)
            {
                throw new UserFriendlyException("Driver not found");
            }

            existingDriver.IdentificationNumber = updatedData.IdentificationNumber;
            existingDriver.FirstName = updatedData.FirstName;
            existingDriver.SecondName = updatedData.SecondName;
            existingDriver.Surname = updatedData.Surname;
            existingDriver.FullName = updatedData.FirstName + " " + updatedData.SecondName + " " + updatedData.Surname;
            existingDriver.DateOfBirth = updatedData.DateOfBirth;
            existingDriver.Gender = updatedData.Gender;
            existingDriver.Email = updatedData.Email;
            existingDriver.CellPhoneNo = updatedData.CellPhoneNo;
            existingDriver.AddressLine1 = updatedData.AddressLine1;
            existingDriver.AddressLine2 = updatedData.AddressLine2;
            existingDriver.City = updatedData.City;
            existingDriver.Province = updatedData.Province;
            existingDriver.PostalCode = updatedData.PostalCode;
            existingDriver.Country = updatedData.Country;
            existingDriver.LicenseNumber = updatedData.LicenseNumber;
            existingDriver.LicenseExpiryDate = updatedData.LicenseExpiryDate;
            existingDriver.LicenseType = updatedData.LicenseType;
            existingDriver.IsActive = updatedData.IsActive;
            existingDriver.TaxiAssociationId = updatedData.TaxiAssociationId;

            await _driverRepository.UpdateAsync(existingDriver);
            return existingDriver;
        }

    }
}
