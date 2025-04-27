using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace evolve.Migrations
{
    /// <inheritdoc />
    public partial class DomainModals : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LocalAuthorities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Jurisdiction = table.Column<string>(type: "text", nullable: true),
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
                    table.PrimaryKey("PK_LocalAuthorities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Marshals",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    NationalIdNo = table.Column<string>(type: "text", nullable: true),
                    FirstName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    SecondName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Surname = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    FullName = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Gender = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CellPhoneNo = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    AddressLine1 = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    AddressLine2 = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    City = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Province = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    PostalCode = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    Country = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
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
                    table.PrimaryKey("PK_Marshals", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Passengers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FirstName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    SecondName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Surname = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CellPhoneNo = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    NextOfKinCellPhoneNo = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    Destination = table.Column<string>(type: "text", nullable: true),
                    FareAmount = table.Column<float>(type: "real", nullable: false),
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
                    table.PrimaryKey("PK_Passengers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Recepients",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FirstName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    SecondName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Surname = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    FullName = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Gender = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CellPhoneNo = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    AddressLine1 = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    AddressLine2 = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    City = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Province = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    PostalCode = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    Country = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
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
                    table.PrimaryKey("PK_Recepients", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Senders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    IdentificationNumber = table.Column<string>(type: "character varying(13)", maxLength: 13, nullable: true),
                    FirstName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    SecondName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Surname = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    FullName = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Gender = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CellPhoneNo = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    AddressLine1 = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    AddressLine2 = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    City = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Province = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    PostalCode = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    Country = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
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
                    table.PrimaryKey("PK_Senders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TaxiAssociations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
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
                    table.PrimaryKey("PK_TaxiAssociations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TaxiRanks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Location = table.Column<string>(type: "text", nullable: true),
                    LocalAuthorityId = table.Column<Guid>(type: "uuid", nullable: true),
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
                    table.PrimaryKey("PK_TaxiRanks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaxiRanks_LocalAuthorities_LocalAuthorityId",
                        column: x => x.LocalAuthorityId,
                        principalTable: "LocalAuthorities",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Cargos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    SenderId = table.Column<Guid>(type: "uuid", nullable: false),
                    RecepeientId = table.Column<Guid>(type: "uuid", nullable: false),
                    CollectionCode = table.Column<string>(type: "text", nullable: true),
                    Fee = table.Column<float>(type: "real", nullable: false),
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
                    table.PrimaryKey("PK_Cargos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cargos_Recepients_RecepeientId",
                        column: x => x.RecepeientId,
                        principalTable: "Recepients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Cargos_Senders_SenderId",
                        column: x => x.SenderId,
                        principalTable: "Senders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Drivers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    IdentificationNumber = table.Column<string>(type: "character varying(13)", maxLength: 13, nullable: true),
                    FirstName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    SecondName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Surname = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    FullName = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Gender = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CellPhoneNo = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    AddressLine1 = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    AddressLine2 = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    City = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Province = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    PostalCode = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    Country = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    LicenseNumber = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    LicenseExpiryDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LicenseType = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    TaxiAssociationId = table.Column<Guid>(type: "uuid", nullable: true),
                    MarshalId = table.Column<Guid>(type: "uuid", nullable: true),
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
                    table.PrimaryKey("PK_Drivers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Drivers_Marshals_MarshalId",
                        column: x => x.MarshalId,
                        principalTable: "Marshals",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Drivers_TaxiAssociations_TaxiAssociationId",
                        column: x => x.TaxiAssociationId,
                        principalTable: "TaxiAssociations",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Routes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Origin = table.Column<string>(type: "text", nullable: true),
                    Destination = table.Column<string>(type: "text", nullable: true),
                    FareAmount = table.Column<float>(type: "real", nullable: false),
                    EstimatedTravelTime = table.Column<int>(type: "integer", nullable: false),
                    MarshalId = table.Column<Guid>(type: "uuid", nullable: true),
                    TaxiAssociationId = table.Column<Guid>(type: "uuid", nullable: true),
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
                    table.PrimaryKey("PK_Routes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Routes_Marshals_MarshalId",
                        column: x => x.MarshalId,
                        principalTable: "Marshals",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Routes_TaxiAssociations_TaxiAssociationId",
                        column: x => x.TaxiAssociationId,
                        principalTable: "TaxiAssociations",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Facilities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: true),
                    Location = table.Column<string>(type: "text", nullable: true),
                    IsOperational = table.Column<bool>(type: "boolean", nullable: false),
                    TaxiRankId = table.Column<Guid>(type: "uuid", nullable: true),
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
                    table.PrimaryKey("PK_Facilities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Facilities_TaxiRanks_TaxiRankId",
                        column: x => x.TaxiRankId,
                        principalTable: "TaxiRanks",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Amount = table.Column<float>(type: "real", nullable: false),
                    DriverId = table.Column<Guid>(type: "uuid", nullable: false),
                    PassangerId = table.Column<Guid>(type: "uuid", nullable: true),
                    SenderId = table.Column<Guid>(type: "uuid", nullable: true),
                    Timestamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
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
                    table.PrimaryKey("PK_Payments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Payments_Drivers_DriverId",
                        column: x => x.DriverId,
                        principalTable: "Drivers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Payments_Passengers_PassangerId",
                        column: x => x.PassangerId,
                        principalTable: "Passengers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Payments_Senders_SenderId",
                        column: x => x.SenderId,
                        principalTable: "Senders",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Lanes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    DesignatedRouteId = table.Column<Guid>(type: "uuid", nullable: true),
                    Capacity = table.Column<int>(type: "integer", nullable: false),
                    TaxiRankId = table.Column<Guid>(type: "uuid", nullable: true),
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
                    table.PrimaryKey("PK_Lanes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lanes_Routes_DesignatedRouteId",
                        column: x => x.DesignatedRouteId,
                        principalTable: "Routes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Lanes_TaxiRanks_TaxiRankId",
                        column: x => x.TaxiRankId,
                        principalTable: "TaxiRanks",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "LostItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    LostTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LostRouteId = table.Column<Guid>(type: "uuid", nullable: true),
                    OwnerId = table.Column<Guid>(type: "uuid", nullable: true),
                    IsReturned = table.Column<bool>(type: "boolean", nullable: false),
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
                    table.PrimaryKey("PK_LostItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LostItems_Passengers_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Passengers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LostItems_Routes_LostRouteId",
                        column: x => x.LostRouteId,
                        principalTable: "Routes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Taxis",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    RegistrationNumber = table.Column<string>(type: "text", nullable: true),
                    DriverId = table.Column<Guid>(type: "uuid", nullable: true),
                    PassengerCapacity = table.Column<int>(type: "integer", nullable: false),
                    AssignedRouteId = table.Column<Guid>(type: "uuid", nullable: true),
                    IsFull = table.Column<bool>(type: "boolean", nullable: false),
                    LaneId = table.Column<Guid>(type: "uuid", nullable: true),
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
                    table.PrimaryKey("PK_Taxis", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Taxis_Drivers_DriverId",
                        column: x => x.DriverId,
                        principalTable: "Drivers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Taxis_Lanes_LaneId",
                        column: x => x.LaneId,
                        principalTable: "Lanes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Taxis_Routes_AssignedRouteId",
                        column: x => x.AssignedRouteId,
                        principalTable: "Routes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cargos_RecepeientId",
                table: "Cargos",
                column: "RecepeientId");

            migrationBuilder.CreateIndex(
                name: "IX_Cargos_SenderId",
                table: "Cargos",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_MarshalId",
                table: "Drivers",
                column: "MarshalId");

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_TaxiAssociationId",
                table: "Drivers",
                column: "TaxiAssociationId");

            migrationBuilder.CreateIndex(
                name: "IX_Facilities_TaxiRankId",
                table: "Facilities",
                column: "TaxiRankId");

            migrationBuilder.CreateIndex(
                name: "IX_Lanes_DesignatedRouteId",
                table: "Lanes",
                column: "DesignatedRouteId");

            migrationBuilder.CreateIndex(
                name: "IX_Lanes_TaxiRankId",
                table: "Lanes",
                column: "TaxiRankId");

            migrationBuilder.CreateIndex(
                name: "IX_LostItems_LostRouteId",
                table: "LostItems",
                column: "LostRouteId");

            migrationBuilder.CreateIndex(
                name: "IX_LostItems_OwnerId",
                table: "LostItems",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_DriverId",
                table: "Payments",
                column: "DriverId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_PassangerId",
                table: "Payments",
                column: "PassangerId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_SenderId",
                table: "Payments",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_Routes_MarshalId",
                table: "Routes",
                column: "MarshalId");

            migrationBuilder.CreateIndex(
                name: "IX_Routes_TaxiAssociationId",
                table: "Routes",
                column: "TaxiAssociationId");

            migrationBuilder.CreateIndex(
                name: "IX_TaxiRanks_LocalAuthorityId",
                table: "TaxiRanks",
                column: "LocalAuthorityId");

            migrationBuilder.CreateIndex(
                name: "IX_Taxis_AssignedRouteId",
                table: "Taxis",
                column: "AssignedRouteId");

            migrationBuilder.CreateIndex(
                name: "IX_Taxis_DriverId",
                table: "Taxis",
                column: "DriverId");

            migrationBuilder.CreateIndex(
                name: "IX_Taxis_LaneId",
                table: "Taxis",
                column: "LaneId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cargos");

            migrationBuilder.DropTable(
                name: "Facilities");

            migrationBuilder.DropTable(
                name: "LostItems");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "Taxis");

            migrationBuilder.DropTable(
                name: "Recepients");

            migrationBuilder.DropTable(
                name: "Passengers");

            migrationBuilder.DropTable(
                name: "Senders");

            migrationBuilder.DropTable(
                name: "Drivers");

            migrationBuilder.DropTable(
                name: "Lanes");

            migrationBuilder.DropTable(
                name: "Routes");

            migrationBuilder.DropTable(
                name: "TaxiRanks");

            migrationBuilder.DropTable(
                name: "Marshals");

            migrationBuilder.DropTable(
                name: "TaxiAssociations");

            migrationBuilder.DropTable(
                name: "LocalAuthorities");
        }
    }
}
