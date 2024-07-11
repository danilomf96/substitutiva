using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Alunos",
                columns: table => new
                {
                    AlunoId = table.Column<string>(type: "TEXT", nullable: false),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    Cpf = table.Column<string>(type: "TEXT", nullable: false),
                    CriadoEm = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Alunos", x => x.AlunoId);
                });

            migrationBuilder.CreateTable(
                name: "Imcs",
                columns: table => new
                {
                    ImcId = table.Column<string>(type: "TEXT", nullable: false),
                    Altura = table.Column<double>(type: "REAL", nullable: true),
                    Peso = table.Column<double>(type: "REAL", nullable: true),
                    ImcTotal = table.Column<double>(type: "REAL", nullable: true),
                    Classificacao = table.Column<string>(type: "TEXT", nullable: true),
                    GrauObesidade = table.Column<string>(type: "TEXT", nullable: true),
                    AlunoId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Imcs", x => x.ImcId);
                    table.ForeignKey(
                        name: "FK_Imcs_Alunos_AlunoId",
                        column: x => x.AlunoId,
                        principalTable: "Alunos",
                        principalColumn: "AlunoId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Imcs_AlunoId",
                table: "Imcs",
                column: "AlunoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Imcs");

            migrationBuilder.DropTable(
                name: "Alunos");
        }
    }
}
