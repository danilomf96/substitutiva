import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Imc } from "../../models/Imc";

function ImcAlterar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5225/api/produto/buscar/${id}`)
        .then((resposta) => resposta.json())
        .then((imc: Imc) => {
          setAltura(imc.altura);
          setPeso(imc.peso);
        });
    }
  }, []);

  function alterarImc(e: any) {
    const imc: Imc = {
      altura: parseDouble(altura),
      peso: parseDouble(peso),
      imcTotal: 0,
      classificacao: "",
      grauObesidade: "",
      alunoId: "",
    };
    //FETCH ou AXIOS
    fetch(`("/api/imc/alterar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imc),
    })
      .then((resposta) => resposta.json())
      .then((imc: Imc) => {
        navigate("/pages/produto/listar");
      });
    e.preventDefault();
  }
  return (
    <div>
      <h1>Alterar Produto</h1>
      <form onSubmit={alterarImc}>
        <label>Nome:</label>
        <input
          type="number"
          value={altura}
          placeholder="Digite o Altura"
          onChange={(e: any) => setAltura(e.target.value)}
          required
        />
        <br />
        <label>Descricao:</label>
        <input
          type="number"
          value={peso}
          placeholder="Digite o descrição"
          onChange={(e: any) => setPeso(e.target.value)}
        />
        <br />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default ImcAlterar;

function parseDouble(peso: string): number {
  throw new Error("Function not implemented.");
}
