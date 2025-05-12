using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.UI;
using evolve.Authorization.Users;
using evolve.Users.Dto;
using Microsoft.AspNetCore.Mvc.Formatters;

namespace evolve.Services.PassengerManagement.PassengarServices
{
    public class PassengerAppService : AsyncCrudAppService<User, UserDto, long>, IPassengerAppService
    {
        private readonly UserManager _userManager;
        public PassengerAppService(IRepository<User, long> repository, UserManager userManager) : base(repository)
        {
            _userManager = userManager;
        }
        public async Task<UserDto> CreatePassenger(CreateUserDto input)
        {
            var user = new User
            {
                UserName = input.UserName,
                EmailAddress = input.EmailAddress,
                Name = input.Name,
                Surname = input.Surname,
                IsEmailConfirmed = true,
                TenantId = AbpSession.TenantId
            };
            var result = await _userManager.CreateAsync(user, input.Password);

            await _userManager.AddToRoleAsync(user, "PASSENGER");


            if (!result.Succeeded)
            {
                throw new UserFriendlyException($"Could not create the user: {result.Errors.JoinAsString(", ")}");
            }

            return ObjectMapper.Map<UserDto>(user);
        }
    }

}
