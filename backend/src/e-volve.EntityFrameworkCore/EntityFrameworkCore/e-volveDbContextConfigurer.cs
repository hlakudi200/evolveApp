using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace e-volve.EntityFrameworkCore;

public static class e-volveDbContextConfigurer
{
    public static void Configure(DbContextOptionsBuilder<e-volveDbContext> builder, string connectionString)
    {
        builder.UseSqlServer(connectionString);
    }

    public static void Configure(DbContextOptionsBuilder<e-volveDbContext> builder, DbConnection connection)
    {
        builder.UseSqlServer(connection);
    }
}
