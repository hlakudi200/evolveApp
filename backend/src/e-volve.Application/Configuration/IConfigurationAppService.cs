using e-volve.Configuration.Dto;
using System.Threading.Tasks;

namespace e-volve.Configuration;

public interface IConfigurationAppService
{
    Task ChangeUiTheme(ChangeUiThemeInput input);
}
