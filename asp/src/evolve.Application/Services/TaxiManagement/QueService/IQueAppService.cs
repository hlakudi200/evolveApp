using System;
using Abp.Application.Services;
using evolve.Services.TaxiManagement.QueService.DTO;

namespace evolve.Services.TaxiManagement.QueService
{
    public interface IQueAppService : IAsyncCrudAppService<QueDto, Guid>
    {
    }
}
