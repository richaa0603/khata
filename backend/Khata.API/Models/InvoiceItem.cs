namespace Khata.API.Models;

public class InvoiceItem
{
    public int Id { get; set; }

    public int InvoiceId { get; set; }

    public int ProductId { get; set; }

    public int Quantity { get; set; }

    public decimal Rate { get; set; }

    public decimal Amount { get; set; }
}