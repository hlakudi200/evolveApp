using System;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using evolve.Domain.TaxiManagement;
using evolve.Services.TaxiManagement.TaxiRankService.DTO;

namespace evolve.Services.TaxiManagement.TaxiRankService
{
    public class TaxiRankAppService : AsyncCrudAppService<TaxiRank, TaxiRankDto, Guid>, ITaxiRankAppService
    {
        public TaxiRankAppService(IRepository<TaxiRank, Guid> repository) : base(repository)
        {
        }
    }
}
