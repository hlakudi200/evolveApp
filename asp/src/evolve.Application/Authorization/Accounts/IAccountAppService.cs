using Abp.Application.Services;
using evolve.Authorization.Accounts.Dto;
using System.Threading.Tasks;

namespace evolve.Authorization.Accounts;

public interface IAccountAppService : IApplicationService
{
    Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

    Task<RegisterOutput> Register(RegisterInput input);
}
