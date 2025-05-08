using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace evolve.Migrations
{
    /// <inheritdoc />
    public partial class dispacthproperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsOnTrip",
                table: "Taxis",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsOnTrip",
                table: "Taxis");
        }
    }
}
