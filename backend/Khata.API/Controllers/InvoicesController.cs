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

    var logoPath =
        Path.Combine(
            Directory.GetCurrentDirectory(),
            "Assets",
            "logo.png");

    byte[] signatureBytes =
        System.IO.File.Exists(signaturePath)
        ? await System.IO.File.ReadAllBytesAsync(
            signaturePath)
        : Array.Empty<byte>();

    byte[] logoBytes =
        System.IO.File.Exists(logoPath)
        ? await System.IO.File.ReadAllBytesAsync(
            logoPath)
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
                        column.Spacing(10);

                        column.Item()
                            .Row(row =>
                            {
                                row.RelativeItem()
                                    .Column(col =>
                                    {
                                        col.Item()
                                            .Text(
                                                "KHATA SANITARY INDUSTRIES"
                                            )
                                            .FontSize(20)
                                            .Bold();

                                        col.Item()
                                            .Text(
                                                "Delhi NCR, India"
                                            );

                                        col.Item()
                                            .Text(
                                                "GSTIN: 22ABCDE1234F1Z5"
                                            );

                                        col.Item()
                                            .Text(
                                                "Phone: +91 9999999999"
                                            );

                                        col.Item()
                                            .Text(
                                                "Account No: 1234567890"
                                            );

                                        col.Item()
                                            .Text(
                                                "IFSC: HDFC0001234"
                                            );
                                    });

                                if (logoBytes.Length > 0)
                                {
                                    row.ConstantItem(90)
                                        .Image(logoBytes);
                                }
                            });

                        column.Item()
                            .PaddingVertical(10);

                        column.Item()
                            .Text("TAX INVOICE")
                            .FontSize(22)
                            .Bold()
                            .AlignCenter();

                        column.Item()
                            .PaddingTop(10);

                        column.Item()
                            .Row(row =>
                            {
                                row.RelativeItem()
                                    .Column(col =>
                                    {
                                        col.Item()
                                            .Text(
                                                $"Invoice No: {invoice.InvoiceNumber}"
                                            );

                                        col.Item()
                                            .Text(
                                                $"Date: {invoice.InvoiceDate:dd MMM yyyy}"
                                            );
                                    });

                                row.RelativeItem()
                                    .Column(col =>
                                    {
                                        col.Item()
                                            .Text("Buyer Details")
                                            .Bold();

                                        col.Item()
                                            .Text(
                                                invoice.Buyer?.BuyerName ?? ""
                                            );

                                        col.Item()
                                            .Text(
                                                invoice.Buyer?.PhoneNumber ?? ""
                                            );

                                        col.Item()
                                            .Text(
                                                invoice.Buyer?.Address ?? ""
                                            );
                                    });
                            });

                        column.Item()
                            .PaddingVertical(15);

                        column.Item()
                            .Table(table =>
                            {
                                table.ColumnsDefinition(columns =>
                                {
                                    columns.RelativeColumn(3);
                                    columns.RelativeColumn(1);
                                    columns.RelativeColumn(1);
                                    columns.RelativeColumn(1);
                                });

                                table.Header(header =>
                                {
                                    header.Cell()
                                        .Background("#22C55E")
                                        .Padding(8)
                                        .Text("Product")
                                        .FontColor(Colors.White);

                                    header.Cell()
                                        .Background("#22C55E")
                                        .Padding(8)
                                        .AlignCenter()
                                        .Text("Qty")
                                        .FontColor(Colors.White);

                                    header.Cell()
                                        .Background("#22C55E")
                                        .Padding(8)
                                        .AlignCenter()
                                        .Text("Rate")
                                        .FontColor(Colors.White);

                                    header.Cell()
                                        .Background("#22C55E")
                                        .Padding(8)
                                        .AlignCenter()
                                        .Text("Amount")
                                        .FontColor(Colors.White);
                                });

                                foreach (var item in items)
                                {
                                    table.Cell()
                                        .BorderBottom(1)
                                        .Padding(8)
                                        .Text(
                                            item.Product?.ProductName ?? ""
                                        );

                                    table.Cell()
                                        .BorderBottom(1)
                                        .Padding(8)
                                        .AlignCenter()
                                        .Text(
                                            item.Quantity.ToString()
                                        );

                                    table.Cell()
                                        .BorderBottom(1)
                                        .Padding(8)
                                        .AlignCenter()
                                        .Text(
                                            $"₹ {item.Rate}"
                                        );

                                    table.Cell()
                                        .BorderBottom(1)
                                        .Padding(8)
                                        .AlignCenter()
                                        .Text(
                                            $"₹ {item.Amount}"
                                        );
                                }
                            });

                        column.Item()
                            .PaddingTop(20);

                        column.Item()
                            .AlignRight()
                            .Width(250)
                            .Column(summary =>
                            {
                                summary.Item()
                                    .Text(
                                        $"Subtotal : ₹ {invoice.SubTotal}"
                                    );

                                summary.Item()
                                    .Text(
                                        $"Discount : ₹ {invoice.DiscountAmount}"
                                    );

                                summary.Item()
                                    .Text(
                                        $"GST : ₹ {invoice.GSTAmount}"
                                    );

                                summary.Item()
                                    .Text(
                                        $"Grand Total : ₹ {invoice.GrandTotal}"
                                    )
                                    .Bold()
                                    .FontSize(16);
                            });

                        column.Item()
                            .PaddingTop(50);

                        column.Item()
                            .Row(row =>
                            {
                                row.RelativeItem()
                                    .Column(col =>
                                    {
                                        col.Item()
                                            .Height(60);

                                        col.Item()
                                            .Text(
                                                "Buyer Signature"
                                            );
                                    });

                                row.RelativeItem()
                                    .AlignRight()
                                    .Column(col =>
                                    {
                                        if (
                                            signatureBytes.Length > 0
                                        )
                                        {
                                            col.Item()
                                                .Width(150)
                                                .Image(
                                                    signatureBytes
                                                );
                                        }

                                        col.Item()
                                            .Text(
                                                "Authorized Signature"
                                            );
                                    });
                            });

                        column.Item()
                            .PaddingTop(30);

                        column.Item()
                            .AlignCenter()
                            .Text(
                                "Thank you for doing business with Khata Sanitary Industries."
                            );
                    });
            });
        })
        .GeneratePdf();

    return File(
        pdfBytes,
        "application/pdf",
        $"{invoice.InvoiceNumber}.pdf");
}