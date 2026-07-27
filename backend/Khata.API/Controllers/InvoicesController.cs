using Khata.API.Data;
using Khata.API.Models;
using Khata.API.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace Khata.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvoicesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public InvoicesController(
        ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        CreateInvoiceRequest request)
    {
        var invoice = new Invoice
{
    InvoiceNumber =
        $"KH-{DateTime.UtcNow.Ticks}",

    BuyerId =
        request.BuyerId,

    ShopkeeperId =
        request.ShopkeeperId,

    InvoiceDate =
        DateTime.UtcNow,

    SubTotal =
        request.Subtotal,

    DiscountAmount =
        request.DiscountAmount,

    GSTAmount =
        request.GstAmount,

    GrandTotal =
        request.GrandTotal
};

        _context.Invoices.Add(invoice);

        await _context.SaveChangesAsync();

        foreach (var item in request.Items)
        {
            _context.InvoiceItems.Add(
    new InvoiceItem
    {
        InvoiceId = invoice.Id,
        ProductId = item.ProductId,
        Rate = item.Rate,
        Quantity = item.Quantity,
        Amount = item.Amount
    });
        }

        await _context.SaveChangesAsync();

        return Ok(invoice.Id);
    }

    [HttpGet]
    public async Task<IActionResult> GetInvoices()
    {
        var invoices = await _context.Invoices
            .Include(x => x.Buyer)
            .OrderByDescending(x => x.InvoiceDate)
            .ToListAsync();

        return Ok(invoices);
    }
    [HttpGet("shopkeeper/{shopkeeperId}")]
public async Task<IActionResult>
    GetShopkeeperInvoices(
        int shopkeeperId)
{
    var invoices = await _context.Invoices
        .Include(x => x.Buyer)
        .Where(x =>
            x.ShopkeeperId ==
            shopkeeperId)
        .OrderByDescending(
            x => x.InvoiceDate)
        .ToListAsync();

    return Ok(invoices);
}

[HttpGet("{invoiceId}/pdf")]
public async Task<IActionResult> DownloadPdf(
    int invoiceId)
{
    var invoice = await _context.Invoices
        .Include(x => x.Buyer)
        .FirstOrDefaultAsync(
            x => x.Id == invoiceId);

    if (invoice == null)
        return NotFound();

    var items = await _context.InvoiceItems
        .Include(x => x.Product)
        .Where(x => x.InvoiceId == invoiceId)
        .ToListAsync();

    var signaturePath =
        Path.Combine(
            Directory.GetCurrentDirectory(),
            "Assets",
            "signature.png");

    byte[] signatureBytes =
        System.IO.File.Exists(signaturePath)
        ? await System.IO.File.ReadAllBytesAsync(
            signaturePath)
        : Array.Empty<byte>();

    var pdfBytes =
        Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Margin(30);

                page.Content()
                    .Column(column =>
                    {
                        column.Item()
                            .Text("TAX INVOICE")
                            .FontSize(20)
                            .Bold();

                        column.Item()
                            .Text($"Invoice No: {invoice.InvoiceNumber}");

                        column.Item()
                            .Text($"Date: {invoice.InvoiceDate:dd MMM yyyy}");

                        column.Item()
                            .Text($"Buyer: {invoice.Buyer?.BuyerName}");

                        column.Item()
                            .PaddingTop(20);

                        foreach (var item in items)
                        {
                            column.Item()
                                .Text(
                                    $"{item.Product?.ProductName} | Qty: {item.Quantity} | Rate: ₹{item.Rate} | Amount: ₹{item.Amount}"
                                );
                        }

                        column.Item()
                            .PaddingTop(20);

                        column.Item()
                            .Text($"Sub Total : ₹{invoice.SubTotal}");

                        column.Item()
                            .Text($"Discount : ₹{invoice.DiscountAmount}");

                        column.Item()
                            .Text($"GST : ₹{invoice.GSTAmount}");

                        column.Item()
                            .Text($"Grand Total : ₹{invoice.GrandTotal}")
                            .Bold();

                        column.Item()
                            .PaddingTop(50);

                        if (signatureBytes.Length > 0)
                        {
                            column.Item()
                                .Width(150)
                                .Image(signatureBytes);
                        }

                        column.Item()
                            .Text("Authorized Signature");
                    });
            });
        })
        .GeneratePdf();

    return File(
        pdfBytes,
        "application/pdf",
        $"{invoice.InvoiceNumber}.pdf");
}

    [HttpGet("buyer/{buyerId}")]
public async Task<IActionResult> GetBuyerInvoices(
    int buyerId)
{
    var invoices = await _context.Invoices
        .Where(x => x.BuyerId == buyerId)
        .OrderByDescending(x => x.InvoiceDate)
        .ToListAsync();

    return Ok(invoices);
}
}