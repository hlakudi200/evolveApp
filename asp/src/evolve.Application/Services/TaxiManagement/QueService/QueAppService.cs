using System;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using evolve.Domain.TaxiManagement;
using evolve.Services.TaxiManagement.QueService.DTO;

namespace evolve.Services.TaxiManagement.QueService
{
    public class QueAppService : AsyncCrudAppService<Que, QueDto, Guid>, IQueAppService
    {
        public QueAppService(IRepository<Que, Guid> repository) : base(repository)
        {
        }
    }
}
