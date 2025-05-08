using System;
using Abp.Application.Services;
using evolve.Services.TaxiManagement.RoutesServices.DTO;

namespace evolve.Services.TaxiManagement.RoutesServices
{
    public interface IRouteAppService : IAsyncCrudAppService<RouteDto, Guid>
    {
    }
}
