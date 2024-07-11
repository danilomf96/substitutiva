import { useEffect, useState } from "react";
import axios from "axios";
import { Imc } from "../../models/Imc";

function ListarImcAluno() {
  const [imcs, setImc] = useState<Imc[]>([]);

  useEffect(() => {
    carregarImcAluno();
  }, []);

  function carregarImcAluno() {
    //FETCH ou AXIOS
    fetch('http://localhost:5283/api/aluno/${id}')
      .then((resposta) => resposta.json())
      .then((imc: Imc[]) => {
        console.table(imc);
        setImc(imc);
      });
  }

  function alterar(id: string) {
    console.log(`Id: ${id}`);
    axios
      .put(`http://localhost:5283/api/imc/alterar/${id}`)
      .then((resposta) => {
        setImc(resposta.data);
      });
  }

  return (
    <div>
      <h1>Listar IMC por aluno</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>#</th>
            <th>Aluno</th>
            <th>Altura</th>
            <th>Peso</th>
            <th>Imc Total</th>
            <th>Classificação</th>
            <th>Criado Em</th>
            <th>Alterar dados</th>
          </tr>
        </thead>
        <tbody>
          {imcs.map((imc) => (
            <tr key={imc.imcId}>
              <td>{imc.imcId}</td>
              <td>{imc.aluno.nome}</td>
              <td>{imc.altura}</td>
              <td>{imc.peso}</td>
              <td>{imc.imcTotal}</td>
              <td>{imc.classificacao}</td>
              <td>{imc.criadoEm}</td>
              <td>
                <button
                  onClick={() => {
                    alterar(imc.imcId!);
                  }}
                >
                  Alterar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarImcAluno;
