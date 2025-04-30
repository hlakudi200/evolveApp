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
                    _logger.LogInformation("⏰ Starting daily Que creation job...");

                    var lanes = await _laneRepository.GetAllListAsync();

                    foreach (var lane in lanes)
                    {
                        var que = new Que
                        {
                            LaneId = lane.Id,
                            CreationDate = DateTime.UtcNow,
                            isOpen = true,
                        };

                        await _queRepository.InsertAsync(que);
                    }

                    await uow.CompleteAsync();

                    _logger.LogInformation("✅ Queues created for all lanes.");
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
