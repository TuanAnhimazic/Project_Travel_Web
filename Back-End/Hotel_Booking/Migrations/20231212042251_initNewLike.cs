using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hotel_Booking.Migrations
{
    public partial class initNewLike : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StayView_Stays_StayId",
                table: "StayView");

            migrationBuilder.DropForeignKey(
                name: "FK_StayView_Users_UserId",
                table: "StayView");

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

            migrationBuilder.CreateTable(
                name: "StayLikes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StayId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    Islike = table.Column<bool>(type: "bit", nullable: false),
                    DateLiked = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StayLikes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StayLikes_Stays_StayId",
                        column: x => x.StayId,
                        principalTable: "Stays",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_StayLikes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_StayLikes_StayId",
                table: "StayLikes",
                column: "StayId");

            migrationBuilder.CreateIndex(
                name: "IX_StayLikes_UserId",
                table: "StayLikes",
                column: "UserId");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StayViews_Stays_StayId",
                table: "StayViews");

            migrationBuilder.DropForeignKey(
                name: "FK_StayViews_Users_UserId",
                table: "StayViews");

            migrationBuilder.DropTable(
                name: "StayLikes");

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
    }
}
