namespace Khata.API.Models;

public class BusinessProfile
{
    public int Id { get; set; }

    public string BusinessName { get; set; } = string.Empty;

    public string GSTNumber { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string AccountNumber { get; set; } = string.Empty;

    public string IFSC { get; set; } = string.Empty;

    public string LogoUrl { get; set; } = string.Empty;
}