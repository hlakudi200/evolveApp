using System;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using evolve.Domain.TaxiManagement;
using evolve.Services.TaxiManagement.TaxiService.DTO;

namespace evolve.Services.TaxiManagement.TaxiService
{
    public class TaxiAppService : AsyncCrudAppService<Taxi, TaxiDto, Guid>, ITaxiAppService
    {
        public TaxiAppService(IRepository<Taxi, Guid> repository) : base(repository)
        {
        }
    }
}
