using Khata.API.Data;
using Khata.API.Models;
using Khata.API.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
}