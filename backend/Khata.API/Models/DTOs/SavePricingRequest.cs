namespace Khata.API.Models.DTOs;

public class SavePricingRequest
{
    public int BuyerId { get; set; }

    public int ProductId { get; set; }

    public decimal Price { get; set; }
}