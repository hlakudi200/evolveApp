using System;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using evolve.Domain.Adminstration;
using evolve.Services.Adminstration.FacilityAppService.DTO;

namespace evolve.Services.Adminstration.FacilityAppService
{
    public class FacilityAppService : AsyncCrudAppService<Facility, FacilityDto, Guid>, IFacilityAppService
    {
        public FacilityAppService(IRepository<Facility, Guid> repository) : base(repository)
        {
        }
    }
}
