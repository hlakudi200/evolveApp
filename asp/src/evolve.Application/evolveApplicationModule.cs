using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using evolve.Authorization;

namespace evolve;

[DependsOn(
    typeof(evolveCoreModule),
    typeof(AbpAutoMapperModule))]
public class evolveApplicationModule : AbpModule
{
    public override void PreInitialize()
    {
        Configuration.Authorization.Providers.Add<evolveAuthorizationProvider>();
    }

    public override void Initialize()
    {
        var thisAssembly = typeof(evolveApplicationModule).GetAssembly();

        IocManager.RegisterAssemblyByConvention(thisAssembly);

        Configuration.Modules.AbpAutoMapper().Configurators.Add(
            // Scan the assembly for classes which inherit from AutoMapper.Profile
            cfg => cfg.AddMaps(thisAssembly)
        );
    }
}
