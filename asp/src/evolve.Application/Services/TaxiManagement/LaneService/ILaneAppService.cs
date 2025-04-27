using System;
using Abp.Application.Services;
using evolve.Services.TaxiManagement.LaneService.DTO;

namespace evolve.Services.TaxiManagement.LaneService
{
    public interface ILaneAppService : IAsyncCrudAppService<LaneDto, Guid>
    {
    }
}
