using Abp.Authorization;
using Abp.Runtime.Session;
using evolve.Configuration.Dto;
using System.Threading.Tasks;

namespace evolve.Configuration;

[AbpAuthorize]
public class ConfigurationAppService : evolveAppServiceBase, IConfigurationAppService
{
    public async Task ChangeUiTheme(ChangeUiThemeInput input)
    {
        await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
    }
}
