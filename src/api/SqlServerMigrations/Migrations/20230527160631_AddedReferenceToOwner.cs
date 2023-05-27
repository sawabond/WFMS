using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddedReferenceToOwner : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WindFarm_AspNetUsers_AppUserId",
                table: "WindFarm");

            migrationBuilder.DropIndex(
                name: "IX_WindFarm_AppUserId",
                table: "WindFarm");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "WindFarm");

            migrationBuilder.AddColumn<string>(
                name: "OwnerId",
                table: "WindFarm",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_WindFarm_OwnerId",
                table: "WindFarm",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_WindFarm_AspNetUsers_OwnerId",
                table: "WindFarm",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WindFarm_AspNetUsers_OwnerId",
                table: "WindFarm");

            migrationBuilder.DropIndex(
                name: "IX_WindFarm_OwnerId",
                table: "WindFarm");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "WindFarm");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "WindFarm",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_WindFarm_AppUserId",
                table: "WindFarm",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_WindFarm_AspNetUsers_AppUserId",
                table: "WindFarm",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
