using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using evolve.Services.TaxiManagement.TaxiAssociationService.DTO;

namespace evolve.Services.TaxiManagement.TaxiAssociationService
{
    public interface ITaxiAssociationAppService : IAsyncCrudAppService<TaxiAssociationDto, Guid>
    {
    }
}
