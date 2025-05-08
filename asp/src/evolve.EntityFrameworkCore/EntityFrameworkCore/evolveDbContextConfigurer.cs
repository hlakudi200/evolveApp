using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace evolve.EntityFrameworkCore;

public static class evolveDbContextConfigurer
{
    public static void Configure(DbContextOptionsBuilder<evolveDbContext> builder, string connectionString)
    {
        builder.UseSqlServer(connectionString);
    }

    public static void Configure(DbContextOptionsBuilder<evolveDbContext> builder, DbConnection connection)
    {
        builder.UseSqlServer(connection);
    }
}
