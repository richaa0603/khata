namespace Khata.API.Models;

public class Invoice
{
    public int Id { get; set; }

    public string InvoiceNumber { get; set; } = string.Empty;

    public int BuyerId { get; set; }

    public int ShopkeeperId { get; set; }

    public DateTime InvoiceDate { get; set; }

    public decimal SubTotal { get; set; }

    public decimal DiscountAmount { get; set; }

    public decimal GSTAmount { get; set; }

    public decimal GrandTotal { get; set; }

    public Buyer? Buyer { get; set; }

    public Shopkeeper? Shopkeeper { get; set; }
}