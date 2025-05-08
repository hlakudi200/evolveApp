using Abp.Hangfire;
using Abp.Hangfire.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using evolve.Configuration;
using evolve.Web.Host.BackgroundJobs;
using Hangfire;
using Hangfire.PostgreSql;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace evolve.Web.Host.Startup
{
    [DependsOn(
        typeof(evolveWebCoreModule),
        typeof(AbpHangfireModule)
    )]
    public class evolveWebHostModule : AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public evolveWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void PreInitialize()
        {

            Configuration.BackgroundJobs.IsJobExecutionEnabled = true;


            Configuration.Modules.AbpHangfire().GlobalConfiguration.UsePostgreSqlStorage(
                _appConfiguration.GetConnectionString("Default")
            );
        }


        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(evolveWebHostModule).GetAssembly());
        }


        public override void PostInitialize()
        {
            var recurringJobManager = IocManager.Resolve<IRecurringJobManager>();

            // Create queues at the top of every hour (e.g., 00:00, 01:00, 02:00...)
            recurringJobManager.AddOrUpdate<MyDailyJob>(
                "create-queues-hourly",
                job => job.ExecuteAsync(),
                "0 * * * *" // CRON: minute 0 of every hour
            );

            // Close queues 5 minutes after creation (e.g., 00:05, 01:05, 02:05...)
            recurringJobManager.AddOrUpdate<CloseQueJob>(
                "close-queues-hourly-offset",
                job => job.ExecuteAsync(),
                "5 * * * *" // CRON: minute 5 of every hour
            );
        }





    }
}
