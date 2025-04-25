using Abp.Authorization;
using Abp.Runtime.Session;
using e-volve.Configuration.Dto;
using System.Threading.Tasks;

namespace e-volve.Configuration;

[AbpAuthorize]
public class ConfigurationAppService : e-volveAppServiceBase, IConfigurationAppService
{
    public async Task ChangeUiTheme(ChangeUiThemeInput input)
    {
        await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
    }
}
