using Abp.Dependency;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using evolve.Domain.TaxiManagement;
using Abp.Domain.Uow;
using Abp.Domain.Repositories;

namespace evolve.Web.Host.BackgroundJobs
{
    public class MyDailyJob : ITransientDependency
    {
        private readonly IRepository<Que, Guid> _queRepository;
        private readonly IRepository<Lane, Guid> _laneRepository;
        private readonly ILogger<MyDailyJob> _logger;
        private readonly IUnitOfWorkManager _unitOfWorkManager;

        public MyDailyJob(
            ILogger<MyDailyJob> logger,
            IRepository<Que, Guid> queRepository,
            IRepository<Lane, Guid> laneRepository,
            IUnitOfWorkManager unitOfWorkManager)
        {
            _logger = logger;
            _queRepository = queRepository;
            _laneRepository = laneRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }

        public async Task ExecuteAsync()
        {
            using (var uow = _unitOfWorkManager.Begin())
            {
                try
                {
                    _logger.LogInformation("⏰ Starting Que creation job...");

                    var lanes = await _laneRepository.GetAllListAsync();
                    var today = DateTime.UtcNow.Date;

                    foreach (var lane in lanes)
                    {
                        // Check if a Que already exists for this lane today
                        var existingQue = await _queRepository.FirstOrDefaultAsync(
                            q => q.LaneId == lane.Id && q.CreationDate.Date == today
                        );

                        if (existingQue != null)
                        {
                            _logger.LogInformation($"⚠️ Que already exists for Lane {lane.Id} today. Skipping...");
                            continue;
                        }

                        var que = new Que
                        {
                            LaneId = lane.Id,
                            CreationDate = DateTime.UtcNow,
                            isOpen = true,
                        };

                        await _queRepository.InsertAsync(que);
                        _logger.LogInformation($"✅ Que created for Lane {lane.Id}.");
                    }

                    await uow.CompleteAsync();
                    _logger.LogInformation("✅ Que creation job completed.");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "❌ Failed to execute Que creation job.");
                    throw;
                }
            }
        }

    }
}
