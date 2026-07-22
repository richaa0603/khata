namespace Khata.API.Models;

public class Invoice
{
    public int Id { get; set; }

    public string? InvoiceNumber { get; set; }

    public DateTime InvoiceDate { get; set; }

    public int BuyerId { get; set; }

    public int ShopkeeperId { get; set; }

    public decimal SubTotal { get; set; }

    public decimal DiscountAmount { get; set; }

    public decimal GSTAmount { get; set; }

    public decimal GrandTotal { get; set; }

    public string? BuyerSignature { get; set; }

    public string? ShopkeeperSignature { get; set; }
}