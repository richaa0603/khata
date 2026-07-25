namespace Khata.API.Models;

public class BuyerProductPricing
{
    public int Id { get; set; }

    public int BuyerId { get; set; }
    public Buyer Buyer { get; set; } = null!;

    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;

    public decimal Price { get; set; }
}