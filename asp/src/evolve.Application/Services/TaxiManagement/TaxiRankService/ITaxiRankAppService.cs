using System;
using Abp.Application.Services;
using evolve.Services.TaxiManagement.TaxiRankService.DTO;

namespace evolve.Services.TaxiManagement.TaxiRankService
{
    public interface ITaxiRankAppService : IAsyncCrudAppService<TaxiRankDto, Guid>
    {
    }
}
