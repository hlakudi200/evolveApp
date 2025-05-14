using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace evolve.Migrations
{
    /// <inheritdoc />
    public partial class taxilocation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Taxis",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Taxis",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "TaxiId",
                table: "AbpUsers",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AbpUsers_TaxiId",
                table: "AbpUsers",
                column: "TaxiId");

            migrationBuilder.AddForeignKey(
                name: "FK_AbpUsers_Taxis_TaxiId",
                table: "AbpUsers",
                column: "TaxiId",
                principalTable: "Taxis",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AbpUsers_Taxis_TaxiId",
                table: "AbpUsers");

            migrationBuilder.DropIndex(
                name: "IX_AbpUsers_TaxiId",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Taxis");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Taxis");

            migrationBuilder.DropColumn(
                name: "TaxiId",
                table: "AbpUsers");
        }
    }
}
