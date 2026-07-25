using Khata.API.Data;
using Khata.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Khata.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShopkeepersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ShopkeepersController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetShopkeepers()
    {
        var shopkeepers = await _context.Shopkeepers
            .OrderBy(x => x.Name)
            .ToListAsync();

        return Ok(shopkeepers);
    }

    [HttpPost]
    public async Task<IActionResult> CreateShopkeeper(
        Shopkeeper shopkeeper)
    {
        _context.Shopkeepers.Add(shopkeeper);

        await _context.SaveChangesAsync();

        return Ok(shopkeeper);
    }
}