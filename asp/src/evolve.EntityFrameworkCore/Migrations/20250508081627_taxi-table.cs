using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace evolve.Migrations
{
    /// <inheritdoc />
    public partial class taxitable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsOnTrip",
                table: "Taxis",
                newName: "IsDispatched");

            migrationBuilder.AddColumn<DateTime>(
                name: "ArrivalTime",
                table: "Taxis",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DispatchTime",
                table: "Taxis",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Taxis",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArrivalTime",
                table: "Taxis");

            migrationBuilder.DropColumn(
                name: "DispatchTime",
                table: "Taxis");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Taxis");

            migrationBuilder.RenameColumn(
                name: "IsDispatched",
                table: "Taxis",
                newName: "IsOnTrip");
        }
    }
}
