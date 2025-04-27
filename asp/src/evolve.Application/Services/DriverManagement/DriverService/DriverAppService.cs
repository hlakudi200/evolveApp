using System;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using evolve.Domain.DriverManagement;
using evolve.Services.DriverManagement.DriverService.DTO;

namespace evolve.Services.DriverManagement.DriverService
{
    public class DriverAppService : AsyncCrudAppService<Driver, DriverDto, Guid>, IDriverAppService
    {
        public DriverAppService(IRepository<Driver, Guid> repository) : base(repository)
        {
        }
    }
}
