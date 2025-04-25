using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace evolve.Controllers
{
    public abstract class evolveControllerBase : AbpController
    {
        protected evolveControllerBase()
        {
            LocalizationSourceName = evolveConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
