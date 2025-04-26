using System.Linq;
using System;
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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Force all DateTime and DateTime? to be treated as UTC
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties()
                .Where(p => p.ClrType == typeof(DateTime) || p.ClrType == typeof(DateTime?)))
            {
                property.SetValueConverter(new Microsoft.EntityFrameworkCore.Storage.ValueConversion.ValueConverter<DateTime, DateTime>(
                    v => v.Kind == DateTimeKind.Utc ? v : v.ToUniversalTime(),
                    v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
                ));
            }
        }
    }
}
