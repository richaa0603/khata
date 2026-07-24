namespace Khata.API.Models;

public class Buyer
{
    public int Id { get; set; }

    public string BuyerName { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public string GSTNumber { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;

    public decimal DiscountPercentage { get; set; }
}