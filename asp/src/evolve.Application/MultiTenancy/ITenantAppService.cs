using Abp.Application.Services;
using evolve.MultiTenancy.Dto;

namespace evolve.MultiTenancy;

public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
{
}

