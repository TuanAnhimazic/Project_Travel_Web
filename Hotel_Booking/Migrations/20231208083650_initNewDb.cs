using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hotel_Booking.Migrations
{
    public partial class initNewDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StayViews_Stays_StayId",
                table: "StayViews");

            migrationBuilder.DropForeignKey(
                name: "FK_StayViews_Users_UserId",
                table: "StayViews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StayViews",
                table: "StayViews");

            migrationBuilder.RenameTable(
                name: "StayViews",
                newName: "StayView");

            migrationBuilder.RenameIndex(
                name: "IX_StayViews_UserId",
                table: "StayView",
                newName: "IX_StayView_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_StayViews_StayId",
                table: "StayView",
                newName: "IX_StayView_StayId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StayView",
                table: "StayView",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_ListAmenities_AmenityId",
                table: "ListAmenities",
                column: "AmenityId");

            migrationBuilder.AddForeignKey(
                name: "FK_ListAmenities_Amenities_AmenityId",
                table: "ListAmenities",
                column: "AmenityId",
                principalTable: "Amenities",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StayView_Stays_StayId",
                table: "StayView",
                column: "StayId",
                principalTable: "Stays",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StayView_Users_UserId",
                table: "StayView",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ListAmenities_Amenities_AmenityId",
                table: "ListAmenities");

            migrationBuilder.DropForeignKey(
                name: "FK_StayView_Stays_StayId",
                table: "StayView");

            migrationBuilder.DropForeignKey(
                name: "FK_StayView_Users_UserId",
                table: "StayView");

            migrationBuilder.DropIndex(
                name: "IX_ListAmenities_AmenityId",
                table: "ListAmenities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StayView",
                table: "StayView");

            migrationBuilder.RenameTable(
                name: "StayView",
                newName: "StayViews");

            migrationBuilder.RenameIndex(
                name: "IX_StayView_UserId",
                table: "StayViews",
                newName: "IX_StayViews_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_StayView_StayId",
                table: "StayViews",
                newName: "IX_StayViews_StayId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StayViews",
                table: "StayViews",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StayViews_Stays_StayId",
                table: "StayViews",
                column: "StayId",
                principalTable: "Stays",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StayViews_Users_UserId",
                table: "StayViews",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
