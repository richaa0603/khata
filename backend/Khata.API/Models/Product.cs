namespace Khata.API.Models;

public class Product
{
    public int Id { get; set; }

    public string ProductName { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public decimal BasePrice { get; set; }

    public int CategoryId { get; set; }

    public Category? Category { get; set; }
}