using evolve.Configuration.Dto;
using System.Threading.Tasks;

namespace evolve.Configuration;

public interface IConfigurationAppService
{
    Task ChangeUiTheme(ChangeUiThemeInput input);
}
