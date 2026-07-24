namespace Khata.API.Models;

public class BuyerProductPricing
{
    public int Id { get; set; }

    public int BuyerId { get; set; }

    public int ProductId { get; set; }

    public decimal CustomPrice { get; set; }

    public Buyer? Buyer { get; set; }

    public Product? Product { get; set; }
}