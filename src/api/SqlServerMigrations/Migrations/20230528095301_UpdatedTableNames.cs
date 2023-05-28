using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedTableNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Turbine_WindFarm_WindFarmId",
                table: "Turbine");

            migrationBuilder.DropForeignKey(
                name: "FK_TurbineSnapshot_Turbine_TurbineId",
                table: "TurbineSnapshot");

            migrationBuilder.DropForeignKey(
                name: "FK_WindFarm_AspNetUsers_OwnerId",
                table: "WindFarm");

            migrationBuilder.DropForeignKey(
                name: "FK_WindFarmSnapshot_WindFarm_WindFarmId",
                table: "WindFarmSnapshot");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WindFarmSnapshot",
                table: "WindFarmSnapshot");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WindFarm",
                table: "WindFarm");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TurbineSnapshot",
                table: "TurbineSnapshot");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Turbine",
                table: "Turbine");

            migrationBuilder.RenameTable(
                name: "WindFarmSnapshot",
                newName: "WindFarmSnapshots");

            migrationBuilder.RenameTable(
                name: "WindFarm",
                newName: "WindFarms");

            migrationBuilder.RenameTable(
                name: "TurbineSnapshot",
                newName: "TurbineSnapshots");

            migrationBuilder.RenameTable(
                name: "Turbine",
                newName: "Turbines");

            migrationBuilder.RenameIndex(
                name: "IX_WindFarmSnapshot_WindFarmId",
                table: "WindFarmSnapshots",
                newName: "IX_WindFarmSnapshots_WindFarmId");

            migrationBuilder.RenameIndex(
                name: "IX_WindFarm_OwnerId",
                table: "WindFarms",
                newName: "IX_WindFarms_OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_TurbineSnapshot_TurbineId",
                table: "TurbineSnapshots",
                newName: "IX_TurbineSnapshots_TurbineId");

            migrationBuilder.RenameIndex(
                name: "IX_Turbine_WindFarmId",
                table: "Turbines",
                newName: "IX_Turbines_WindFarmId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WindFarmSnapshots",
                table: "WindFarmSnapshots",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WindFarms",
                table: "WindFarms",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TurbineSnapshots",
                table: "TurbineSnapshots",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Turbines",
                table: "Turbines",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Turbines_WindFarms_WindFarmId",
                table: "Turbines",
                column: "WindFarmId",
                principalTable: "WindFarms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TurbineSnapshots_Turbines_TurbineId",
                table: "TurbineSnapshots",
                column: "TurbineId",
                principalTable: "Turbines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WindFarms_AspNetUsers_OwnerId",
                table: "WindFarms",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WindFarmSnapshots_WindFarms_WindFarmId",
                table: "WindFarmSnapshots",
                column: "WindFarmId",
                principalTable: "WindFarms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Turbines_WindFarms_WindFarmId",
                table: "Turbines");

            migrationBuilder.DropForeignKey(
                name: "FK_TurbineSnapshots_Turbines_TurbineId",
                table: "TurbineSnapshots");

            migrationBuilder.DropForeignKey(
                name: "FK_WindFarms_AspNetUsers_OwnerId",
                table: "WindFarms");

            migrationBuilder.DropForeignKey(
                name: "FK_WindFarmSnapshots_WindFarms_WindFarmId",
                table: "WindFarmSnapshots");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WindFarmSnapshots",
                table: "WindFarmSnapshots");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WindFarms",
                table: "WindFarms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TurbineSnapshots",
                table: "TurbineSnapshots");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Turbines",
                table: "Turbines");

            migrationBuilder.RenameTable(
                name: "WindFarmSnapshots",
                newName: "WindFarmSnapshot");

            migrationBuilder.RenameTable(
                name: "WindFarms",
                newName: "WindFarm");

            migrationBuilder.RenameTable(
                name: "TurbineSnapshots",
                newName: "TurbineSnapshot");

            migrationBuilder.RenameTable(
                name: "Turbines",
                newName: "Turbine");

            migrationBuilder.RenameIndex(
                name: "IX_WindFarmSnapshots_WindFarmId",
                table: "WindFarmSnapshot",
                newName: "IX_WindFarmSnapshot_WindFarmId");

            migrationBuilder.RenameIndex(
                name: "IX_WindFarms_OwnerId",
                table: "WindFarm",
                newName: "IX_WindFarm_OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_TurbineSnapshots_TurbineId",
                table: "TurbineSnapshot",
                newName: "IX_TurbineSnapshot_TurbineId");

            migrationBuilder.RenameIndex(
                name: "IX_Turbines_WindFarmId",
                table: "Turbine",
                newName: "IX_Turbine_WindFarmId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WindFarmSnapshot",
                table: "WindFarmSnapshot",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WindFarm",
                table: "WindFarm",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TurbineSnapshot",
                table: "TurbineSnapshot",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Turbine",
                table: "Turbine",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Turbine_WindFarm_WindFarmId",
                table: "Turbine",
                column: "WindFarmId",
                principalTable: "WindFarm",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TurbineSnapshot_Turbine_TurbineId",
                table: "TurbineSnapshot",
                column: "TurbineId",
                principalTable: "Turbine",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WindFarm_AspNetUsers_OwnerId",
                table: "WindFarm",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WindFarmSnapshot_WindFarm_WindFarmId",
                table: "WindFarmSnapshot",
                column: "WindFarmId",
                principalTable: "WindFarm",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
