using System.ComponentModel.DataAnnotations;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);
var app = builder.Build();

app.MapGet("/", () => "Substitutiva");


//cadastrar aluno
app.MapPost("/api/aluno/cadastrar",
    ([FromBody] Aluno aluno,
    [FromServices] AppDataContext ctx) =>
{
    List<ValidationResult> erros = new
        List<ValidationResult>();
    if (!Validator.TryValidateObject(
        aluno, new ValidationContext(aluno),
        erros, true))
    {
        return Results.BadRequest(erros);
    }
    Aluno? alunoBuscado = ctx.Alunos.
        FirstOrDefault(x => x.Cpf == aluno.Cpf);
    if (alunoBuscado is not null)
    {
        return Results.
            BadRequest("Já existe um aluno com o mesmo CPF");
    }
    ctx.Alunos.Add(aluno);
    ctx.SaveChanges();
    return Results.Created("", aluno);
});

//cadastrar imc
app.MapPost("/api/imc/cadastrar",
    ([FromBody] Imc imc,
    [FromServices] AppDataContext ctx) =>
{
    Aluno? aluno =
         ctx.Alunos.Find(imc.AlunoId);

    if (aluno is null)
    {
        return Results.NotFound("Aluno não encontrado");
    }
    imc.Aluno = aluno;

    //Calcular o salário bruto
    imc.ImcTotal = imc.Peso / (imc.Altura * imc.Altura);

    //Calcular o IRRF
    if (imc.ImcTotal < 18.5)
    {
        imc.Classificacao = "Magreza";
        imc.GrauObesidade = "0";
    }
    if (imc.ImcTotal > 18.4 && imc.ImcTotal < 24.9)
    {
        imc.Classificacao = "Normal";
        imc.GrauObesidade = "0";
    }
    if (imc.ImcTotal > 24.9 && imc.ImcTotal < 30)
    {
        imc.Classificacao = "Sobrepeso";
        imc.GrauObesidade = "I";
    }
    if (imc.ImcTotal > 29.9 && imc.ImcTotal < 40)
    {
        imc.Classificacao = "Obesidade";
        imc.GrauObesidade = "II";
    }
    if (imc.ImcTotal > 39.9)
    {
        imc.Classificacao = "Obesidade Grave";
        imc.GrauObesidade = "III";
    }
    ctx.Imcs.Add(imc);
    ctx.SaveChanges();
    return Results.Created("", imc);
});

app.MapGet("/api/imc/listar", ([FromServices] AppDataContext ctx) =>
{
    return Results.Ok(ctx.Imcs.Include(x => x.Aluno).ToList());
});
app.MapGet("/api/aluno/listar", ([FromServices] AppDataContext ctx) =>
{
    return Results.Ok(ctx.Alunos.ToList());
});
app.MapGet("/api/aluno/{alunoId}/imc", ([FromServices] AppDataContext ctx, string alunoId) =>
{
    return Results.Ok(ctx.Imcs.Include(x => x.Aluno).Where(x => x.AlunoId == alunoId).ToList());
});



app.MapPut("/api/imc/alterar/{imcId}", ([FromServices] AppDataContext ctx,
    [FromRoute] string imcId,
    [FromBody] Imc imcAlterado) =>
{
    Imc? imc = ctx.Imcs.Find(imcId);
    if (imc == null)
    {
        return Results.NotFound("IMC não encontrado");
    }
    imc.Altura = imcAlterado.Altura;
    imc.Peso = imcAlterado.Peso;

    ctx.Imcs.Update(imc);
    ctx.SaveChanges();
    return Results.Ok(imc);
});


app.UseCors("Acesso Total");
app.Run();
