using Abp.Authorization;
using evolve.Authorization.Roles;
using evolve.Authorization.Users;

namespace evolve.Authorization;

public class PermissionChecker : PermissionChecker<Role, User>
{
    public PermissionChecker(UserManager userManager)
        : base(userManager)
    {
    }
}
