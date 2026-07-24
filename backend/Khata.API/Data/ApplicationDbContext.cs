using Khata.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Khata.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<BusinessProfile> BusinessProfiles => Set<BusinessProfile>();

    public DbSet<Shopkeeper> Shopkeepers => Set<Shopkeeper>();

    public DbSet<Buyer> Buyers => Set<Buyer>();

    public DbSet<Category> Categories => Set<Category>();

    public DbSet<Product> Products => Set<Product>();

    public DbSet<BuyerProductPricing> BuyerProductPricings => Set<BuyerProductPricing>();

    public DbSet<Invoice> Invoices => Set<Invoice>();

    public DbSet<InvoiceItem> InvoiceItems => Set<InvoiceItem>();
}