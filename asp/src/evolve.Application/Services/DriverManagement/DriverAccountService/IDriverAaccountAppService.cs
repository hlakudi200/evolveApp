using System;
using Abp.Application.Services;
using evolve.Services.DriverManagement.DriverAccountService.DTO;

namespace evolve.Services.DriverManagement.DriverAccountService
{
    public interface IDriverAaccountAppService : IAsyncCrudAppService<DriverAccountDetailsDto, Guid>
    {
    }
}
