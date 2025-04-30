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

            recurringJobManager.AddOrUpdate<MyDailyJob>(
                "create-daily-queues",
                job => job.ExecuteAsync(),
                Cron.Daily(0, 0)
            );


            recurringJobManager.AddOrUpdate<CloseQueJob>(
                "close-daily-queues",
                job => job.ExecuteAsync(),
                "59 11 * * *"
            );
        }



    }
}
