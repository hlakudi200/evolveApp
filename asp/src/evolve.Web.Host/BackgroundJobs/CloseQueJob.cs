using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using evolve.Domain.TaxiManagement;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System;
using Abp.Dependency;

namespace evolve.Web.Host.BackgroundJobs
{
    public class CloseQueJob : ITransientDependency
    {
        private readonly IRepository<Que, Guid> _queRepository;
        private readonly ILogger<CloseQueJob> _logger;
        private readonly IUnitOfWorkManager _unitOfWorkManager;

        public CloseQueJob(
            ILogger<CloseQueJob> logger,
            IRepository<Que, Guid> queRepository,
            IUnitOfWorkManager unitOfWorkManager)
        {
            _logger = logger;
            _queRepository = queRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }

        public async Task ExecuteAsync()
        {
            using (var uow = _unitOfWorkManager.Begin())
            {
                try
                {
                    _logger.LogInformation("🕛 Closing today's queues...");

                    var today = DateTime.UtcNow.Date;

                    var openQueues = await _queRepository
                        .GetAllListAsync(q => q.CreationDate.Date == today && q.isOpen);

                    foreach (var que in openQueues)
                    {
                        que.isOpen = false;
                    }

                    await uow.CompleteAsync();
                    _logger.LogInformation("✅ All open queues for today have been closed.");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "❌ Failed to close queues.");
                    throw;
                }
            }
        }
    }
}
