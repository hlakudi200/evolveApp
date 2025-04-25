using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using e-volve.Authorization;

namespace e-volve;

[DependsOn(
    typeof(e-volveCoreModule),
    typeof(AbpAutoMapperModule))]
public class e-volveApplicationModule : AbpModule
{
    public override void PreInitialize()
    {
        Configuration.Authorization.Providers.Add<e-volveAuthorizationProvider>();
    }

    public override void Initialize()
    {
        var thisAssembly = typeof(e-volveApplicationModule).GetAssembly();

        IocManager.RegisterAssemblyByConvention(thisAssembly);

        Configuration.Modules.AbpAutoMapper().Configurators.Add(
            // Scan the assembly for classes which inherit from AutoMapper.Profile
            cfg => cfg.AddMaps(thisAssembly)
        );
    }
}
