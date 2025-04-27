using System;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using evolve.Domain.TaxiManagement;
using evolve.Services.TaxiManagement.TaxiAssociationService.DTO;

namespace evolve.Services.TaxiManagement.TaxiAssociationService
{
    public class TaxiAssociationAppService : AsyncCrudAppService<TaxiAssociation, TaxiAssociationDto, Guid>, ITaxiAssociationAppService
    {
        public TaxiAssociationAppService(IRepository<TaxiAssociation, Guid> repository) : base(repository)
        {
        }
    }
}
