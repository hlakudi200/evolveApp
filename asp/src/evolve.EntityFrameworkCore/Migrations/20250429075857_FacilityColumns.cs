using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace evolve.Migrations
{
    /// <inheritdoc />
    public partial class FacilityColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Location",
                table: "Facilities",
                newName: "Name");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Facilities",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Unit",
                table: "Facilities",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Facilities");

            migrationBuilder.DropColumn(
                name: "Unit",
                table: "Facilities");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Facilities",
                newName: "Location");
        }
    }
}
