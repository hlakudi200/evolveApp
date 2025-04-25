using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using e-volve.EntityFrameworkCore;
using e-volve.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace e-volve.Web.Tests;

[DependsOn(
    typeof(e-volveWebMvcModule),
    typeof(AbpAspNetCoreTestBaseModule)
)]
public class e-volveWebTestModule : AbpModule
{
    public e-volveWebTestModule(e-volveEntityFrameworkModule abpProjectNameEntityFrameworkModule)
    {
        abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
    }

    public override void PreInitialize()
    {
        Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
    }

    public override void Initialize()
    {
        IocManager.RegisterAssemblyByConvention(typeof(e-volveWebTestModule).GetAssembly());
    }

    public override void PostInitialize()
    {
        IocManager.Resolve<ApplicationPartManager>()
            .AddApplicationPartsIfNotAddedBefore(typeof(e-volveWebMvcModule).Assembly);
    }
}