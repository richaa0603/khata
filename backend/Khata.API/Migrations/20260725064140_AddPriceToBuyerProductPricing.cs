using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Khata.API.Migrations
{
    /// <inheritdoc />
    public partial class AddPriceToBuyerProductPricing : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CustomPrice",
                table: "BuyerProductPricings",
                newName: "Price");

            migrationBuilder.AlterColumn<string>(
                name: "PhotoUrl",
                table: "Shopkeepers",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price",
                table: "BuyerProductPricings",
                newName: "CustomPrice");

            migrationBuilder.AlterColumn<string>(
                name: "PhotoUrl",
                table: "Shopkeepers",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}
