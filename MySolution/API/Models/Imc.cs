namespace API.Models;

public class Imc
{
    public string? ImcId { get; set;} = Guid.NewGuid().ToString();
    public double? Altura { get; set; }
    public double? Peso { get; set; }
    public double? ImcTotal { get; set; }
    public string? Classificacao { get; set; }
    public string? GrauObesidade { get; set; }
    public Aluno? Aluno { get; set; }
    public string? AlunoId { get; set; }
}