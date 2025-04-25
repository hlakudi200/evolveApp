using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using evolve.EntityFrameworkCore;
using evolve.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace evolve.Web.Tests;

[DependsOn(
    typeof(evolveWebMvcModule),
    typeof(AbpAspNetCoreTestBaseModule)
)]
public class evolveWebTestModule : AbpModule
{
    public evolveWebTestModule(evolveEntityFrameworkModule abpProjectNameEntityFrameworkModule)
    {
        abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
    }

    public override void PreInitialize()
    {
        Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
    }

    public override void Initialize()
    {
        IocManager.RegisterAssemblyByConvention(typeof(evolveWebTestModule).GetAssembly());
    }

    public override void PostInitialize()
    {
        IocManager.Resolve<ApplicationPartManager>()
            .AddApplicationPartsIfNotAddedBefore(typeof(evolveWebMvcModule).Assembly);
    }
}