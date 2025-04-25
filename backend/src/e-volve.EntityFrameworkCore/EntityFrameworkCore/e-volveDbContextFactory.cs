using e-volve.Configuration;
using e-volve.Web;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace e-volve.EntityFrameworkCore;

/* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
public class e-volveDbContextFactory : IDesignTimeDbContextFactory<e-volveDbContext>
{
    public e-volveDbContext CreateDbContext(string[] args)
    {
        var builder = new DbContextOptionsBuilder<e-volveDbContext>();

        /*
         You can provide an environmentName parameter to the AppConfigurations.Get method. 
         In this case, AppConfigurations will try to read appsettings.{environmentName}.json.
         Use Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") method or from string[] args to get environment if necessary.
         https://docs.microsoft.com/en-us/ef/core/cli/dbcontext-creation?tabs=dotnet-core-cli#args
         */
        var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

        e-volveDbContextConfigurer.Configure(builder, configuration.GetConnectionString(e-volveConsts.ConnectionStringName));

        return new e-volveDbContext(builder.Options);
    }
}
