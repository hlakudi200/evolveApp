using Abp.Events.Bus;
using Abp.Modules;
using Abp.Reflection.Extensions;
using evolve.Configuration;
using evolve.EntityFrameworkCore;
using evolve.Migrator.DependencyInjection;
using Castle.MicroKernel.Registration;
using Microsoft.Extensions.Configuration;

namespace evolve.Migrator;

[DependsOn(typeof(evolveEntityFrameworkModule))]
public class evolveMigratorModule : AbpModule
{
    private readonly IConfigurationRoot _appConfiguration;

    public evolveMigratorModule(evolveEntityFrameworkModule abpProjectNameEntityFrameworkModule)
    {
        abpProjectNameEntityFrameworkModule.SkipDbSeed = true;

        _appConfiguration = AppConfigurations.Get(
            typeof(evolveMigratorModule).GetAssembly().GetDirectoryPathOrNull()
        );
    }

    public override void PreInitialize()
    {
        Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
            evolveConsts.ConnectionStringName
        );

        Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
        Configuration.ReplaceService(
            typeof(IEventBus),
            () => IocManager.IocContainer.Register(
                Component.For<IEventBus>().Instance(NullEventBus.Instance)
            )
        );
    }

    public override void Initialize()
    {
        IocManager.RegisterAssemblyByConvention(typeof(evolveMigratorModule).GetAssembly());
        ServiceCollectionRegistrar.Register(IocManager);
    }
}
