using System;
using System.Linq;
using Abp.Zero.EntityFrameworkCore;
using evolve.Authorization.Roles;
using evolve.Authorization.Users;
using evolve.Domain.Adminstration;
using evolve.Domain.CargoManagement;
using evolve.Domain.DriverManagement;
using evolve.Domain.PassengerManagement;
using evolve.Domain.PaymentMangement;
using evolve.Domain.TaxiManagement;
using evolve.MultiTenancy;
using Microsoft.EntityFrameworkCore;

namespace evolve.EntityFrameworkCore;

public class evolveDbContext : AbpZeroDbContext<Tenant, Role, User, evolveDbContext>
{

    public DbSet<Cargo> Cargos { get; set; }
    public DbSet<Driver> Drivers { get; set; }
    public DbSet<Facility> Facilities { get; set; }
    public DbSet<Lane> Lanes { get; set; }
    public DbSet<LocalAuthority> LocalAuthorities { get; set; }
    public DbSet<LostItem> LostItems { get; set; }
    public DbSet<Marshal> Marshals { get; set; }
    public DbSet<Passenger> Passengers { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<Recepient> Recepients { get; set; }
    public DbSet<Route> Routes { get; set; }
    public DbSet<Sender> Senders { get; set; }
    public DbSet<Taxi> Taxis { get; set; }
    public DbSet<TaxiAssociation> TaxiAssociations { get; set; }
    public DbSet<TaxiRank> TaxiRanks { get; set; }
    public DbSet<Que> Ques { get; set; }
    public DbSet<DriverAccountDetails> DriverAccountDetails { get; set; }


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
