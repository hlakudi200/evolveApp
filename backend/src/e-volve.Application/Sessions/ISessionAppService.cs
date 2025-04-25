using Abp.Application.Services;
using e-volve.Sessions.Dto;
using System.Threading.Tasks;

namespace e-volve.Sessions;

public interface ISessionAppService : IApplicationService
{
    Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
}
