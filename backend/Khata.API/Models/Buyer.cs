namespace Khata.API.Models;

public class Buyer
{
    public int Id { get; set; }

    public string BuyerName { get; set; } = string.Empty;

    public string? GSTNumber { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Address { get; set; }

    public decimal DiscountPercentage { get; set; }
}