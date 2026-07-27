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

    [HttpPost("{id}/signature")]
public async Task<IActionResult>
UploadSignature(
    int id,
    IFormFile file)
{
    var shopkeeper =
        await _context.Shopkeepers
            .FindAsync(id);

    if (shopkeeper == null)
        return NotFound();

    var uploadsFolder =
        Path.Combine(
            Directory.GetCurrentDirectory(),
            "Uploads",
            "Signatures"
        );

    Directory.CreateDirectory(
        uploadsFolder
    );

    var fileName =
        $"{Guid.NewGuid()}" +
        Path.GetExtension(
            file.FileName
        );

    var filePath =
        Path.Combine(
            uploadsFolder,
            fileName
        );

    using var stream =
        new FileStream(
            filePath,
            FileMode.Create
        );

    await file.CopyToAsync(stream);

    shopkeeper.SignaturePath =
        fileName;

    await _context
        .SaveChangesAsync();

    return Ok(
        shopkeeper.SignaturePath
    );
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