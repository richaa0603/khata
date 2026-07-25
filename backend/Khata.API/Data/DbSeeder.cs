using Khata.API.Models;

namespace Khata.API.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        if (!context.Shopkeepers.Any())
        {
            context.Shopkeepers.AddRange(
                new Shopkeeper { Name = "Arsh" },
                new Shopkeeper { Name = "Sonali" }
            );
        }

        if (!context.Categories.Any())
        {
            context.Categories.AddRange(
                new Category { Name = "Taps" },
                new Category { Name = "Showers" },
                new Category { Name = "Wash Basins" },
                new Category { Name = "Drain Covers" }
            );
        }

        await context.SaveChangesAsync();

        if (!context.Products.Any())
        {
            var taps = context.Categories.First(x => x.Name == "Taps");
            var showers = context.Categories.First(x => x.Name == "Showers");
            var basins = context.Categories.First(x => x.Name == "Wash Basins");
            var drains = context.Categories.First(x => x.Name == "Drain Covers");

            context.Products.AddRange(
                new Product
                {
                    ProductName = "Chrome Tap",
                    BasePrice = 450,
                    CategoryId = taps.Id
                },
                new Product
                {
                    ProductName = "Premium Steel Tap",
                    BasePrice = 650,
                    CategoryId = taps.Id
                },
                new Product
                {
                    ProductName = "Rain Shower",
                    BasePrice = 1200,
                    CategoryId = showers.Id
                },
                new Product
                {
                    ProductName = "Ultra Shower",
                    BasePrice = 1800,
                    CategoryId = showers.Id
                },
                new Product
                {
                    ProductName = "Classic Basin",
                    BasePrice = 2200,
                    CategoryId = basins.Id
                },
                new Product
                {
                    ProductName = "Premium Basin",
                    BasePrice = 3200,
                    CategoryId = basins.Id
                },
                new Product
                {
                    ProductName = "Steel Drain Cover",
                    BasePrice = 250,
                    CategoryId = drains.Id
                },
                new Product
                {
                    ProductName = "Brass Drain Cover",
                    BasePrice = 450,
                    CategoryId = drains.Id
                }
            );
        }

        if (!context.Buyers.Any())
        {
            context.Buyers.AddRange(
                new Buyer
                {
                    BuyerName = "Gupta Traders",
                    PhoneNumber = "9999990001",
                    GSTNumber = "GST001",
                    Address = "Delhi",
                    DiscountPercentage = 5
                },
                new Buyer
                {
                    BuyerName = "Royal Sanitary",
                    PhoneNumber = "9999990002",
                    GSTNumber = "GST002",
                    Address = "Noida",
                    DiscountPercentage = 8
                },
                new Buyer
                {
                    BuyerName = "Om Enterprises",
                    PhoneNumber = "9999990003",
                    GSTNumber = "GST003",
                    Address = "Ghaziabad",
                    DiscountPercentage = 10
                }
            );
        }

        await context.SaveChangesAsync();
    }
}