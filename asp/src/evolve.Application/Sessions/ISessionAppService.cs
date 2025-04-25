using Abp.Application.Services;
using evolve.Sessions.Dto;
using System.Threading.Tasks;

namespace evolve.Sessions;

public interface ISessionAppService : IApplicationService
{
    Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
}
