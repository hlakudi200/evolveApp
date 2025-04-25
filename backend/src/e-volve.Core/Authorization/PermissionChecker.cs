using Abp.Authorization;
using e-volve.Authorization.Roles;
using e-volve.Authorization.Users;

namespace e-volve.Authorization;

public class PermissionChecker : PermissionChecker<Role, User>
{
    public PermissionChecker(UserManager userManager)
        : base(userManager)
    {
    }
}
