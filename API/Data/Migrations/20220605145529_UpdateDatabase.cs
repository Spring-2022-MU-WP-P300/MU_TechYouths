using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class UpdateDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78d2a001-ad7d-4b39-86d3-4604e7d5fe5b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cef51936-ddb8-4603-9bd6-539eee6ab604");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "15a89a5f-88c5-4217-a24f-7390d6f8e6d9", "93401964-1309-446a-8b37-d5fe127933a1", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "fda9a6bc-9017-4bea-867c-2d29f8d7131f", "c0d043a1-752c-40ca-8578-1b97562cf972", "General", "GENERAL" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "15a89a5f-88c5-4217-a24f-7390d6f8e6d9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fda9a6bc-9017-4bea-867c-2d29f8d7131f");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "cef51936-ddb8-4603-9bd6-539eee6ab604", "fb068e0a-15c1-499b-aa43-d786dbede97c", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "78d2a001-ad7d-4b39-86d3-4604e7d5fe5b", "ba830b75-46e7-4d3c-b7d0-fd618863fde0", "General", "GENERAL" });
        }
    }
}
