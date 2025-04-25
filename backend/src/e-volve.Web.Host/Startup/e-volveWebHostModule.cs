using Abp.Modules;
using Abp.Reflection.Extensions;
using e-volve.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace e-volve.Web.Host.Startup
{
    [DependsOn(
       typeof(e-volveWebCoreModule))]
    public class e-volveWebHostModule : AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public e-volveWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(e-volveWebHostModule).GetAssembly());
        }
    }
}
