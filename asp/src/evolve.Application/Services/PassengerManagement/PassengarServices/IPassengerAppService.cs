using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using evolve.Users.Dto;

namespace evolve.Services.PassengerManagement.PassengarServices
{
    public interface IPassengerAppService : IAsyncCrudAppService<UserDto, long>
    {
    }
}
