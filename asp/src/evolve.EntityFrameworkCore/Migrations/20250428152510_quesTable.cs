using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace evolve.Migrations
{
    /// <inheritdoc />
    public partial class quesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Taxis_Lanes_LaneId",
                table: "Taxis");

            migrationBuilder.RenameColumn(
                name: "LaneId",
                table: "Taxis",
                newName: "QueId");

            migrationBuilder.RenameIndex(
                name: "IX_Taxis_LaneId",
                table: "Taxis",
                newName: "IX_Taxis_QueId");

            migrationBuilder.CreateTable(
                name: "Ques",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    LaneId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    isOpen = table.Column<bool>(type: "boolean", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ques", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ques_Lanes_LaneId",
                        column: x => x.LaneId,
                        principalTable: "Lanes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ques_LaneId",
                table: "Ques",
                column: "LaneId");

            migrationBuilder.AddForeignKey(
                name: "FK_Taxis_Ques_QueId",
                table: "Taxis",
                column: "QueId",
                principalTable: "Ques",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Taxis_Ques_QueId",
                table: "Taxis");

            migrationBuilder.DropTable(
                name: "Ques");

            migrationBuilder.RenameColumn(
                name: "QueId",
                table: "Taxis",
                newName: "LaneId");

            migrationBuilder.RenameIndex(
                name: "IX_Taxis_QueId",
                table: "Taxis",
                newName: "IX_Taxis_LaneId");

            migrationBuilder.AddForeignKey(
                name: "FK_Taxis_Lanes_LaneId",
                table: "Taxis",
                column: "LaneId",
                principalTable: "Lanes",
                principalColumn: "Id");
        }
    }
}
