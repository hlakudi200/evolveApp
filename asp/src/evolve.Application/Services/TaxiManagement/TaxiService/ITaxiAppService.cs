using System;
using Abp.Application.Services;
using evolve.Services.TaxiManagement.TaxiService.DTO;

namespace evolve.Services.TaxiManagement.TaxiService
{
    public interface ITaxiAppService : IAsyncCrudAppService<TaxiDto, Guid>
    {
    }
}
