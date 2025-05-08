using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace evolve.Migrations
{
    /// <inheritdoc />
    public partial class addedpaymentamanagemt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Passengers_PassangerId",
                table: "Payments");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Senders_SenderId",
                table: "Payments");

            migrationBuilder.RenameColumn(
                name: "Timestamp",
                table: "Payments",
                newName: "PaymentDate");

            migrationBuilder.RenameColumn(
                name: "SenderId",
                table: "Payments",
                newName: "QrCodeId");

            migrationBuilder.RenameColumn(
                name: "PassangerId",
                table: "Payments",
                newName: "PayoutId");

            migrationBuilder.RenameIndex(
                name: "IX_Payments_SenderId",
                table: "Payments",
                newName: "IX_Payments_QrCodeId");

            migrationBuilder.RenameIndex(
                name: "IX_Payments_PassangerId",
                table: "Payments",
                newName: "IX_Payments_PayoutId");

            migrationBuilder.AlterColumn<decimal>(
                name: "Amount",
                table: "Payments",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AddColumn<string>(
                name: "GatewayResponseCode",
                table: "Payments",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GatewayTransactionId",
                table: "Payments",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PaymentMethod",
                table: "Payments",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Payments",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TransactionReference",
                table: "Payments",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "DriverAccountDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    DriverId = table.Column<Guid>(type: "uuid", nullable: false),
                    BankName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    BranchCode = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    AccountNumberEncrypted = table.Column<string>(type: "text", nullable: false),
                    BankGroupId = table.Column<string>(type: "text", nullable: true),
                    AccountHolderName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    AccountType = table.Column<string>(type: "text", nullable: false),
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
                    table.PrimaryKey("PK_DriverAccountDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DriverAccountDetails_Drivers_DriverId",
                        column: x => x.DriverId,
                        principalTable: "Drivers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PaymentQrCode",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    DriverId = table.Column<Guid>(type: "uuid", nullable: false),
                    QrCodeContent = table.Column<string>(type: "text", nullable: true),
                    QrCodeImageUrl = table.Column<string>(type: "text", nullable: true),
                    GeneratedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ExpiryDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
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
                    table.PrimaryKey("PK_PaymentQrCode", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PaymentQrCode_Drivers_DriverId",
                        column: x => x.DriverId,
                        principalTable: "Drivers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Payout",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    DriverId = table.Column<Guid>(type: "uuid", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "numeric", nullable: false),
                    ServiceFeeAmount = table.Column<decimal>(type: "numeric", nullable: false),
                    NetPayoutAmount = table.Column<decimal>(type: "numeric", nullable: false),
                    ScheduledDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ProcessedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: false),
                    BankReference = table.Column<string>(type: "text", nullable: true),
                    PeriodStart = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    PeriodEnd = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
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
                    table.PrimaryKey("PK_Payout", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Payout_Drivers_DriverId",
                        column: x => x.DriverId,
                        principalTable: "Drivers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_UserId",
                table: "Drivers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DriverAccountDetails_DriverId",
                table: "DriverAccountDetails",
                column: "DriverId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PaymentQrCode_DriverId",
                table: "PaymentQrCode",
                column: "DriverId");

            migrationBuilder.CreateIndex(
                name: "IX_Payout_DriverId",
                table: "Payout",
                column: "DriverId");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Drivers_AbpUsers_UserId",
            //    table: "Drivers",
            //    column: "UserId",
            //    principalTable: "AbpUsers",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_PaymentQrCode_QrCodeId",
                table: "Payments",
                column: "QrCodeId",
                principalTable: "PaymentQrCode",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Payout_PayoutId",
                table: "Payments",
                column: "PayoutId",
                principalTable: "Payout",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Drivers_AbpUsers_UserId",
                table: "Drivers");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_PaymentQrCode_QrCodeId",
                table: "Payments");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Payout_PayoutId",
                table: "Payments");

            migrationBuilder.DropTable(
                name: "DriverAccountDetails");

            migrationBuilder.DropTable(
                name: "PaymentQrCode");

            migrationBuilder.DropTable(
                name: "Payout");

            migrationBuilder.DropIndex(
                name: "IX_Drivers_UserId",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "GatewayResponseCode",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "GatewayTransactionId",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "PaymentMethod",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "TransactionReference",
                table: "Payments");

            migrationBuilder.RenameColumn(
                name: "QrCodeId",
                table: "Payments",
                newName: "SenderId");

            migrationBuilder.RenameColumn(
                name: "PayoutId",
                table: "Payments",
                newName: "PassangerId");

            migrationBuilder.RenameColumn(
                name: "PaymentDate",
                table: "Payments",
                newName: "Timestamp");

            migrationBuilder.RenameIndex(
                name: "IX_Payments_QrCodeId",
                table: "Payments",
                newName: "IX_Payments_SenderId");

            migrationBuilder.RenameIndex(
                name: "IX_Payments_PayoutId",
                table: "Payments",
                newName: "IX_Payments_PassangerId");

            migrationBuilder.AlterColumn<float>(
                name: "Amount",
                table: "Payments",
                type: "real",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Passengers_PassangerId",
                table: "Payments",
                column: "PassangerId",
                principalTable: "Passengers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Senders_SenderId",
                table: "Payments",
                column: "SenderId",
                principalTable: "Senders",
                principalColumn: "Id");
        }
    }
}
