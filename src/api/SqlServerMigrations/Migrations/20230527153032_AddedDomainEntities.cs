using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddedDomainEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WindFarm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Capacity = table.Column<double>(type: "float", nullable: false),
                    CommissioningDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AppUserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WindFarm", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WindFarm_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Turbine",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WindFarmId = table.Column<int>(type: "int", nullable: false),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false),
                    HeightMeters = table.Column<double>(type: "float", nullable: false),
                    PitchAngle = table.Column<double>(type: "float", nullable: false),
                    GlobalAngle = table.Column<double>(type: "float", nullable: false),
                    PowerRating = table.Column<double>(type: "float", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Turbine", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Turbine_WindFarm_WindFarmId",
                        column: x => x.WindFarmId,
                        principalTable: "WindFarm",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WindFarmSnapshot",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WindFarmId = table.Column<int>(type: "int", nullable: false),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TotalPowerOutput = table.Column<double>(type: "float", nullable: false),
                    TotalPowerCapacity = table.Column<double>(type: "float", nullable: false),
                    Efficiency = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WindFarmSnapshot", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WindFarmSnapshot_WindFarm_WindFarmId",
                        column: x => x.WindFarmId,
                        principalTable: "WindFarm",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TurbineSnapshot",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TurbineId = table.Column<int>(type: "int", nullable: false),
                    PitchAngle = table.Column<double>(type: "float", nullable: false),
                    GlobalAngle = table.Column<double>(type: "float", nullable: false),
                    WindSpeed = table.Column<double>(type: "float", nullable: false),
                    RotorSpeed = table.Column<double>(type: "float", nullable: false),
                    PowerOutput = table.Column<double>(type: "float", nullable: false),
                    TemperatureCelsius = table.Column<double>(type: "float", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    StatusReason = table.Column<int>(type: "int", nullable: false),
                    StatusComment = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TurbineSnapshot", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TurbineSnapshot_Turbine_TurbineId",
                        column: x => x.TurbineId,
                        principalTable: "Turbine",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Turbine_WindFarmId",
                table: "Turbine",
                column: "WindFarmId");

            migrationBuilder.CreateIndex(
                name: "IX_TurbineSnapshot_TurbineId",
                table: "TurbineSnapshot",
                column: "TurbineId");

            migrationBuilder.CreateIndex(
                name: "IX_WindFarm_AppUserId",
                table: "WindFarm",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_WindFarmSnapshot_WindFarmId",
                table: "WindFarmSnapshot",
                column: "WindFarmId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TurbineSnapshot");

            migrationBuilder.DropTable(
                name: "WindFarmSnapshot");

            migrationBuilder.DropTable(
                name: "Turbine");

            migrationBuilder.DropTable(
                name: "WindFarm");
        }
    }
}
