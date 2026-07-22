using Microsoft.EntityFrameworkCore;
using Khata.API.Models;

namespace Khata.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Buyer> Buyers => Set<Buyer>();

    public DbSet<Category> Categories => Set<Category>();

    public DbSet<Product> Products => Set<Product>();

    public DbSet<Shopkeeper> Shopkeepers => Set<Shopkeeper>();

    public DbSet<BuyerProductPricing> BuyerProductPricing => Set<BuyerProductPricing>();

    public DbSet<Invoice> Invoices => Set<Invoice>();

    public DbSet<InvoiceItem> InvoiceItems => Set<InvoiceItem>();
}