using Abp.Events.Bus;
using Abp.Modules;
using Abp.Reflection.Extensions;
using e-volve.Configuration;
using e-volve.EntityFrameworkCore;
using e-volve.Migrator.DependencyInjection;
using Castle.MicroKernel.Registration;
using Microsoft.Extensions.Configuration;

namespace e-volve.Migrator;

[DependsOn(typeof(e-volveEntityFrameworkModule))]
public class e-volveMigratorModule : AbpModule
{
    private readonly IConfigurationRoot _appConfiguration;

    public e-volveMigratorModule(e-volveEntityFrameworkModule abpProjectNameEntityFrameworkModule)
    {
        abpProjectNameEntityFrameworkModule.SkipDbSeed = true;

        _appConfiguration = AppConfigurations.Get(
            typeof(e-volveMigratorModule).GetAssembly().GetDirectoryPathOrNull()
        );
    }

    public override void PreInitialize()
    {
        Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
            e-volveConsts.ConnectionStringName
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
        IocManager.RegisterAssemblyByConvention(typeof(e-volveMigratorModule).GetAssembly());
        ServiceCollectionRegistrar.Register(IocManager);
    }
}
