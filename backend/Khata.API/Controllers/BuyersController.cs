using Khata.API.Data;
using Khata.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace Khata.API.Controllers;
[ApiController]
[Route("api/[controller]")]
public class BuyersController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    public BuyersController(ApplicationDbContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<IActionResult> GetBuyers()
    {
        var buyers = await _context.Buyers
            .OrderBy(x => x.BuyerName)
            .ToListAsync();
        return Ok(buyers);
    }
    [HttpPost]
    public async Task<IActionResult> CreateBuyer(Buyer buyer)
    {
        _context.Buyers.Add(buyer);
        await _context.SaveChangesAsync();
        return Ok(buyer);
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBuyer(int id)
    {
        var buyer = await _context.Buyers.FindAsync(id);
        if (buyer == null)
            return NotFound();
        _context.Buyers.Remove(buyer);
        await _context.SaveChangesAsync();
        return NoContent();
    }
    [HttpGet("{id}")]
public async Task<IActionResult> GetBuyer(
    int id)
{
    var buyer = await _context.Buyers
        .FindAsync(id);
    if (buyer == null)
        return NotFound();
    return Ok(buyer);
}
}