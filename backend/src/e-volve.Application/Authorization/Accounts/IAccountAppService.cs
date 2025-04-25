using Abp.Application.Services;
using e-volve.Authorization.Accounts.Dto;
using System.Threading.Tasks;

namespace e-volve.Authorization.Accounts;

public interface IAccountAppService : IApplicationService
{
    Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

    Task<RegisterOutput> Register(RegisterInput input);
}
