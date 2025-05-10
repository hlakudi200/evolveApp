using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using evolve.Domain.PaymentMangement;
using evolve.Services.DriverManagement.DriverAccountService.DTO;
using Microsoft.EntityFrameworkCore;

namespace evolve.Services.DriverManagement.DriverAccountService
{
    public class DriverAaccountAppService : AsyncCrudAppService<DriverAccountDetails, DriverAccountDetailsDto, Guid>, IDriverAaccountAppService
    {
        public DriverAaccountAppService(IRepository<DriverAccountDetails, Guid> repository) : base(repository)
        {
        }

        public async Task<DriverAccountDetailsDto> GetDriverAccountByID(Guid driverId)
        {
            var account = await Repository
                 .GetAll()
                 .FirstOrDefaultAsync(d => d.DriverId == driverId);

            if (account == null)
            {
                throw new UserFriendlyException("No account found for the specified driver.");
            }

            return ObjectMapper.Map<DriverAccountDetailsDto>(account);

        }

    }
}
