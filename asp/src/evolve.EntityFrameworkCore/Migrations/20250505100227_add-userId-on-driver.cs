﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace evolve.Migrations
{
    /// <inheritdoc />
    public partial class adduserIdondriver : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "Drivers",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Drivers");
        }
    }
}
