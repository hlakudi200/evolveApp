using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace e-volve.Controllers
{
    public abstract class e-volveControllerBase : AbpController
    {
        protected e-volveControllerBase()
        {
            LocalizationSourceName = e-volveConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
