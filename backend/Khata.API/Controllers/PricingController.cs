using Khata.API.Data;
using Khata.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Khata.API.Models.DTOs;
namespace Khata.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PricingController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public PricingController(
        ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("buyer/{buyerId}")]
    public async Task<IActionResult>
        GetBuyerPricing(int buyerId)
    {
        var pricing = await _context
            .BuyerProductPricings
            .Include(x => x.Product)
            .Where(x => x.BuyerId == buyerId)
            .Select(x => new
            {
                x.ProductId,
                ProductName =
                    x.Product.ProductName,
                x.Price
            })
            .ToListAsync();

        return Ok(pricing);
    }

    [HttpPost]
public async Task<IActionResult>
    SavePricing(
        [FromBody] SavePricingRequest pricing)
{
    var existing =
        await _context
            .BuyerProductPricings
            .FirstOrDefaultAsync(x =>
                x.BuyerId == pricing.BuyerId &&
                x.ProductId == pricing.ProductId);

    if (existing == null)
    {
        _context.BuyerProductPricings.Add(
            new BuyerProductPricing
            {
                BuyerId = pricing.BuyerId,
                ProductId = pricing.ProductId,
                Price = pricing.Price
            });
    }
    else
    {
        existing.Price = pricing.Price;
    }

    await _context.SaveChangesAsync();

    return Ok();
}
    [HttpGet("buyer/{buyerId}/all-products")]
public async Task<IActionResult> GetBuyerPricingForAllProducts(
    int buyerId)
{
    var products = await _context.Products
        .ToListAsync();

    var pricing = await _context.BuyerProductPricings
        .Where(x => x.BuyerId == buyerId)
        .ToListAsync();

    var result = products.Select(product =>
    {
        var buyerPrice = pricing.FirstOrDefault(
            x => x.ProductId == product.Id);

        return new
        {
            product.Id,
            product.ProductName,
            Price = buyerPrice?.Price ?? product.BasePrice
        };
    });

    return Ok(result);
}
}
