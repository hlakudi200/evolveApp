using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using evolve.Domain.TaxiManagement;
using evolve.Services.TaxiManagement.LaneService.DTO;
using Microsoft.EntityFrameworkCore;

namespace evolve.Services.TaxiManagement.LaneService
{
    public class LaneAppService : AsyncCrudAppService<Lane, LaneDto, Guid>, ILaneAppService
    {
        public LaneAppService(IRepository<Lane, Guid> repository) : base(repository)
        {
        }

        public async Task<List<LaneResponseDto>> GetAllInclude()
        {
            var query = await Repository.GetAllReadonlyAsync();

            var lanes = await query
                .Include(p => p.Queus).ThenInclude(p => p.QuedTaxis)
                .Include(p => p.DesignatedRoute)
                .ToListAsync();

            var results = ObjectMapper.Map<List<LaneResponseDto>>(lanes);

            return results;
        }

        public async Task<List<LaneResponseDto>> GetLanesByTaxiId(Guid taxiId)
        {
            var query = await Repository.GetAllReadonlyAsync();

            var lanes = await query
                .Include(p => p.Queus)
                    .ThenInclude(q => q.QuedTaxis)
                .Include(p => p.DesignatedRoute)
                .Where(lane => lane.Queus.Any(queue =>
                    queue.QuedTaxis.Any(taxi => taxi.Id == taxiId)))
                .ToListAsync();

            // Do NOT filter the quedTaxis — keep full queue info
            var results = ObjectMapper.Map<List<LaneResponseDto>>(lanes);
            return results;
        }




    }
}
