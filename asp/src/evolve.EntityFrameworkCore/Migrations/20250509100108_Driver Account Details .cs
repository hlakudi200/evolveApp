using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace evolve.Migrations
{
    /// <inheritdoc />
    public partial class DriverAccountDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BankGroupId",
                table: "DriverAccountDetails");

            migrationBuilder.RenameColumn(
                name: "AccountNumberEncrypted",
                table: "DriverAccountDetails",
                newName: "AccountNumber");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AccountNumber",
                table: "DriverAccountDetails",
                newName: "AccountNumberEncrypted");

            migrationBuilder.AddColumn<string>(
                name: "BankGroupId",
                table: "DriverAccountDetails",
                type: "text",
                nullable: true);
        }
    }
}
