using Abp.Zero.EntityFrameworkCore;
using evolve.Authorization.Roles;
using evolve.Authorization.Users;
using evolve.MultiTenancy;
using Microsoft.EntityFrameworkCore;

namespace evolve.EntityFrameworkCore;

public class evolveDbContext : AbpZeroDbContext<Tenant, Role, User, evolveDbContext>
{
    /* Define a DbSet for each entity of the application */

    public evolveDbContext(DbContextOptions<evolveDbContext> options)
        : base(options)
    {
    }
}
