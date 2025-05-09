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
using evolve.Services.EmailService.DTO;
using evolve.Services.EmailService;
using Microsoft.EntityFrameworkCore;
using evolve.Services.PaymentManagement.PaymentAppService.DTO;

namespace evolve.Services.DriverManagement.DriverService
{
    public class DriverAppService : AsyncCrudAppService<Driver, DriverDto, Guid>, IDriverAppService
    {
        private readonly UserManager _userManager;
        private readonly DriverManager _driverManager;
        private readonly EmailAppService _emailAppService;
        public DriverAppService(IRepository<Driver, Guid> repository, UserManager userManager, DriverManager driverManager, EmailAppService emailAppService) : base(repository)
        {
            _userManager = userManager;
            _driverManager = driverManager;
            _emailAppService = emailAppService;
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
                await SendDriverCredentialsEmail(input.Email, input.FirstName, username, password, input.Email);
                await Repository.InsertAsync(driver);

                return ObjectMapper.Map<DriverDto>(driver);
            }
            catch (Exception ex)
            {

                throw new UserFriendlyException("Error creating driver", ex);
            }
        }
        public async Task<List<DriverDto>> GetAllInclude()
        {
            var query = await Repository.GetAllAsync();
            var driverWithAssociation = await query.Include(p => p.Association).Include(p => p.Payments).ToListAsync();

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
                Payments = driver.Payments?.Select(p => new PaymentDto
                {
                    Amount = p.Amount,
                    PaymentDate = p.PaymentDate,
                    TransactionReference = p.TransactionReference,
                    GatewayResponseCode = p.GatewayResponseCode,
                    GatewayTransactionId = p.GatewayTransactionId,
                    Status = p.Status,
                    PayoutId = p.PayoutId
                }).ToList()
            }).ToList();

            return results;
        }


        public async Task<DriverDto> GetDriverByUserIdAsync(long userId)
        {
            var driver = await Repository.GetAll()
                .Include(e => e.User)
                .Include(e => e.Payments)
                .FirstOrDefaultAsync(e => e.UserId == userId);

            if (driver == null)
            {
                throw new UserFriendlyException("Driver not found");
            }

            var user = await _userManager.GetUserByIdAsync(driver.UserId);

            var driverDto = new DriverDto
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
                Payments = driver.Payments?.Select(p => new PaymentDto
                {   Id=p.Id,
                    DriverId=p.DriverId,
                    Amount = p.Amount,
                    PaymentDate = p.PaymentDate,
                    TransactionReference = p.TransactionReference,
                    GatewayResponseCode = p.GatewayResponseCode,
                    GatewayTransactionId = p.GatewayTransactionId,
                    Status = p.Status,
                    PayoutId = p.PayoutId
                }).ToList()
            };

            return driverDto;
        }

        public override async Task<DriverDto> GetAsync(EntityDto<Guid> input)
        {
            var driver = await Repository.GetAll()
                .Include(e => e.Association)
                .Include(e => e.Payments)
                .FirstOrDefaultAsync(e => e.Id == input.Id);

            if (driver == null)
            {
                throw new UserFriendlyException("Driver not found");
            }

            var user = await _userManager.GetUserByIdAsync(driver.UserId);

            var driverDto = new DriverDto
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
                Payments = driver.Payments?.Select(p => new PaymentDto
                {
                    Amount = p.Amount,
                    PaymentDate = p.PaymentDate,
                    TransactionReference = p.TransactionReference,
                    GatewayResponseCode = p.GatewayResponseCode,
                    GatewayTransactionId = p.GatewayTransactionId,
                    Status = p.Status,
                    PayoutId = p.PayoutId
                }).ToList()
            };

            return driverDto;
        }

        private async Task SendDriverCredentialsEmail(string driverEmail, string driverName, string username, string password, string email)
        {
            try
            {
                string emailBody = $@"
        <html>
        <body style='font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; padding: 20px;'>
            <div style='max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);'>
                <h2 style='color: #2c3e50;'>Welcome to <span style='color: #00a859;'>e-Volve</span>!</h2>

                <p>Dear {driverName},</p>

                <p>We are pleased to welcome you to the e-Volve platform. As a registered taxi driver, you're joining a growing network that is revolutionizing how the taxi industry operates in the 4th industrial revolution.</p>

                <p>With e-Volve, you’ll be able to:</p>
                <ul>
                    <li>Manage queue positions at taxi ranks</li>
                    <li>Board long-distance passengers efficiently</li>
                    <li>Access real-time stats to track your earnings</li>
                    <li>Accept card payments </li>
                </ul>

                <p>Here are your login credentials:</p>
                <div style='background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;'>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Username:</strong> {username}</p>
                    <p><strong>Password:</strong> {password}</p>
                </div>

                <p>After logging in, we recommend changing your password and updating your profile.</p>

                <p>If you need help, please contact your rank manager or our support team.</p>

                <p>We’re excited to work with you to help evolve the transport industry.</p>

                <p>Warm regards,<br><strong>e-Volve Support Team</strong></p>
            </div>
        </body>
        </html>";

                var emailRequest = new EmailRequestDto
                {
                    To = driverEmail,
                    Subject = "Welcome to e-Volve – Your Driver Login Details",
                    Body = emailBody,
                    IsBodyHtml = true
                };

                await _emailAppService.SendEmail(emailRequest);
                Logger.Info($"Driver credentials email sent successfully to: {driverEmail}");
            }
            catch (Exception ex)
            {
                Logger.Error($"Failed to send driver credentials email to {driverEmail}: {ex.Message}", ex);
            }
        }



    }

}
