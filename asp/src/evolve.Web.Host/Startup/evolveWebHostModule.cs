using Abp.Modules;
using Abp.Reflection.Extensions;
using evolve.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace evolve.Web.Host.Startup
{
    [DependsOn(
       typeof(evolveWebCoreModule))]
    public class evolveWebHostModule : AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public evolveWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(evolveWebHostModule).GetAssembly());
        }
    }
}
