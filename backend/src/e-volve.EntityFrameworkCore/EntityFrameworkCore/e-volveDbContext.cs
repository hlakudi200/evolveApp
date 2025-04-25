using Abp.Zero.EntityFrameworkCore;
using e-volve.Authorization.Roles;
using e-volve.Authorization.Users;
using e-volve.MultiTenancy;
using Microsoft.EntityFrameworkCore;

namespace e-volve.EntityFrameworkCore;

public class e-volveDbContext : AbpZeroDbContext<Tenant, Role, User, e-volveDbContext>
{
    /* Define a DbSet for each entity of the application */

    public e-volveDbContext(DbContextOptions<e-volveDbContext> options)
        : base(options)
    {
    }
}
