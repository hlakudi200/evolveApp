using System;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using evolve.Domain.TaxiManagement;
using evolve.Services.TaxiManagement.RoutesServices.DTO;

namespace evolve.Services.TaxiManagement.RoutesServices
{
    public class RouteAppService : AsyncCrudAppService<Route, RouteDto, Guid>, IRouteAppService
    {
        public RouteAppService(IRepository<Route, Guid> repository) : base(repository)
        {
        }
    }
}
