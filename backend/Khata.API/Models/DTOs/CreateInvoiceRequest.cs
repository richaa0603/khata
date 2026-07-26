namespace Khata.API.Models.DTOs;

public class CreateInvoiceRequest
{
    public int BuyerId { get; set; }

    public int ShopkeeperId { get; set; }

    public decimal Subtotal { get; set; }

    public decimal DiscountAmount { get; set; }

    public decimal GstAmount { get; set; }

    public decimal GrandTotal { get; set; }

    public List<CreateInvoiceItemRequest> Items
        { get; set; } = [];
}

public class CreateInvoiceItemRequest
{
    public int ProductId { get; set; }

    public string ProductName { get; set; } = "";

    public decimal Rate { get; set; }

    public int Quantity { get; set; }

    public decimal Amount { get; set; }
}