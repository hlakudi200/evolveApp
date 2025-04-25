using Abp.Application.Services;
using e-volve.MultiTenancy.Dto;

namespace e-volve.MultiTenancy;

public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
{
}

