using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using evolve.Domain.DriverManagement;
using evolve.Services.DriverManagement.DriverService.DTO;

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



    }
}
