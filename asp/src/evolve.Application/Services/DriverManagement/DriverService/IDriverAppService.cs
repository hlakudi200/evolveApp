using System;
using Abp.Application.Services;
using evolve.Services.DriverManagement.DriverService.DTO;

namespace evolve.Services.DriverManagement.DriverService
{
    public interface IDriverAppService : IAsyncCrudAppService<DriverDto, Guid>
    {
    }
}
