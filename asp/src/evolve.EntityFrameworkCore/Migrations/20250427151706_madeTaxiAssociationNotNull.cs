using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace evolve.Migrations
{
    /// <inheritdoc />
    public partial class madeTaxiAssociationNotNull : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Drivers_TaxiAssociations_TaxiAssociationId",
                table: "Drivers");

            migrationBuilder.AlterColumn<Guid>(
                name: "TaxiAssociationId",
                table: "Drivers",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Drivers_TaxiAssociations_TaxiAssociationId",
                table: "Drivers",
                column: "TaxiAssociationId",
                principalTable: "TaxiAssociations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Drivers_TaxiAssociations_TaxiAssociationId",
                table: "Drivers");

            migrationBuilder.AlterColumn<Guid>(
                name: "TaxiAssociationId",
                table: "Drivers",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddForeignKey(
                name: "FK_Drivers_TaxiAssociations_TaxiAssociationId",
                table: "Drivers",
                column: "TaxiAssociationId",
                principalTable: "TaxiAssociations",
                principalColumn: "Id");
        }
    }
}
