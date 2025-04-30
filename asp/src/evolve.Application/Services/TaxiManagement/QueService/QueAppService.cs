using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using evolve.Domain.TaxiManagement;
using evolve.Services.TaxiManagement.QueService.DTO;
using Microsoft.EntityFrameworkCore;

namespace evolve.Services.TaxiManagement.QueService
{
    public class QueAppService : AsyncCrudAppService<Que, QueDto, Guid>, IQueAppService
    {
        public QueAppService(IRepository<Que, Guid> repository) : base(repository)
        {
        }

        public async Task<List<QueDto>> GetAllInclude()
        {
            var query = await Repository.GetAllAsync();

            var queInclude = await query
                .Include(q => q.Lane)
                .ThenInclude(l => l.DesignatedRoute)
                .ToListAsync();

            var result = ObjectMapper.Map<List<QueDto>>(queInclude);
            return result;
        }

    }
}
