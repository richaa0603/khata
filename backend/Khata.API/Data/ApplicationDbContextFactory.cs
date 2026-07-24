using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Khata.API.Data;

public class ApplicationDbContextFactory
    : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    public ApplicationDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder =
            new DbContextOptionsBuilder<ApplicationDbContext>();

        optionsBuilder.UseNpgsql(
    "Host=sakura.proxy.rlwy.net;" +
    "Port=12081;" +
    "Database=railway;" +
    "Username=postgres;" +
    "Password=yaDQrFtFSewlrQmhczHnYKlpaWYtsJiQ;" +
    "SSL Mode=Require;" +
    "Trust Server Certificate=true;");
        return new ApplicationDbContext(
            optionsBuilder.Options);
    }
}