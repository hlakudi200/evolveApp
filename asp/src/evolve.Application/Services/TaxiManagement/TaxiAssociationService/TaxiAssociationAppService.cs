using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using evolve.Domain.TaxiManagement;
using evolve.Services.TaxiManagement.TaxiAssociationService.DTO;
using Microsoft.EntityFrameworkCore;

namespace evolve.Services.TaxiManagement.TaxiAssociationService
{
    public class TaxiAssociationAppService : AsyncCrudAppService<TaxiAssociation, TaxiAssociationDto, Guid>, ITaxiAssociationAppService
    {
        public TaxiAssociationAppService(IRepository<TaxiAssociation, Guid> repository) : base(repository)
        {
        }
        public async Task<List<TaxiAssociationDto>> GetAllInclude()
        {
            var association = await Repository
                .GetAll()
                .Include(x => x.Members)
                .Include(x => x.ControlledRoutes)
                .ToListAsync();

            return ObjectMapper.Map<List<TaxiAssociationDto>>(association);
        }
    }
}
