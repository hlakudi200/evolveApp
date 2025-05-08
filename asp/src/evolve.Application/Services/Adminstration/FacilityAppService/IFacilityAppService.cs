using System;
using Abp.Application.Services;
using evolve.Services.Adminstration.FacilityAppService.DTO;

namespace evolve.Services.Adminstration.FacilityAppService
{
    public interface IFacilityAppService : IAsyncCrudAppService<FacilityDto, Guid>
    {
    }
}
