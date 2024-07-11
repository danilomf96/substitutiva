using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class Aluno
{
    public string? AlunoId { get; set; } = Guid.NewGuid().ToString();
    public string? Nome { get; set; }

    [Required(ErrorMessage = "Campo obrigatório!")]
    public string? Cpf { get; set; }
    public DateTime? CriadoEm { get; set; } = DateTime.Now;

}