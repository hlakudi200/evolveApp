using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace evolve.Migrations
{
    /// <inheritdoc />
    public partial class routemanagement : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Routes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Routes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Routes");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Routes");
        }
    }
}
