using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using evolve.Domain.TaxiManagement;
using evolve.Services.TaxiManagement.QueService.DTO;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace evolve.Services.TaxiManagement.QueService
{
    public class QueAppService : AsyncCrudAppService<Que, QueDto, Guid>, IQueAppService
    {
        private readonly IRepository<Taxi, Guid> _taxiRepository;

        public QueAppService(
            IRepository<Que, Guid> repository,
            IRepository<Taxi, Guid> taxiRepository
        ) : base(repository)
        {
            _taxiRepository = taxiRepository;
        }

        public async Task<List<QueDto>> GetAllInclude()
        {
            var query = await Repository.GetAllAsync();

            var queInclude = await query
                .Include(q => q.Lane)
                .ThenInclude(l => l.DesignatedRoute)
                .Include(q => q.QuedTaxis)
                .ToListAsync();

            return ObjectMapper.Map<List<QueDto>>(queInclude);
        }

        public async Task AddTaxiToQue(Guid queId, Guid taxiId)
        {
            var que = await Repository
                .GetAllIncluding(q => q.QuedTaxis)
                .FirstOrDefaultAsync(q => q.Id == queId);

            if (que == null)
                throw new Exception("Queue not found.");

            if (!que.isOpen)
                throw new Exception("Queue is closed.");

            var taxi = await _taxiRepository.FirstOrDefaultAsync(t => t.Id == taxiId);
            if (taxi == null)
                throw new Exception("Taxi not found.");

            if (que.QuedTaxis.Any(t => t.Id == taxiId))
                throw new Exception("Taxi already in queue.");

            que.QuedTaxis.Add(taxi);
            await Repository.UpdateAsync(que);
        }
        public async Task DispatchTaxiFromQue(Guid queId, Guid taxiId)
        {
            var que = await Repository
                .GetAllIncluding(q => q.QuedTaxis)
                .FirstOrDefaultAsync(q => q.Id == queId);

            if (que == null)
                throw new Exception("Queue not found.");

            var taxi = que.QuedTaxis.FirstOrDefault(t => t.Id == taxiId);
            if (taxi == null)
                throw new Exception("Taxi not found in this queue.");

            // Remove the taxi from the queue
            que.QuedTaxis.Remove(taxi);

            // Mark it as dispatched
            taxi.IsDispatched = true;
            taxi.DispatchTime = DateTime.UtcNow;
            taxi.Status = "Dispatched";
            await _taxiRepository.UpdateAsync(taxi);

            // Persist the updated queue
            await Repository.UpdateAsync(que);
        }


    }
}
