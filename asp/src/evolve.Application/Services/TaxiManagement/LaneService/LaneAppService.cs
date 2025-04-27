using System;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using evolve.Domain.TaxiManagement;
using evolve.Services.TaxiManagement.LaneService.DTO;

namespace evolve.Services.TaxiManagement.LaneService
{
    public class LaneAppService : AsyncCrudAppService<Lane, LaneDto, Guid>, ILaneAppService
    {
        public LaneAppService(IRepository<Lane, Guid> repository) : base(repository)
        {
        }
    }
}
