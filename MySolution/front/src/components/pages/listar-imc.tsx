import React, { useEffect, useState } from "react";
import axios from "axios";
import { Imc } from "../../models/Imc";
import { useNavigate } from "react-router-dom";
import { Aluno } from "../../models/Aluno";

function ListarImc() {
  const [imcs, setImcs] = useState<Imc[]>([]);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarImc();
    carregarAlunos();
  }, []);

  function carregarImc() {
    axios.get("http://localhost:5283/api/imc/listar")
      .then((resposta) => {
        console.table(resposta.data);
        setImcs(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao carregar IMCs:", erro);
      });
  }

  function carregarAlunos() {
    axios.get("http://localhost:5283/api/aluno/listar")
      .then((resposta) => {
        console.table(resposta.data);
        setAlunos(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao carregar Alunos:", erro);
      });
  }

  function carregarImcAluno(id: string) {
    console.log(`Id do aluno: ${id}`);
    axios.get(`http://localhost:5283/aluno/${id}/imc`)
      .then((resposta) => {
        console.log(resposta.data);
        setImcs(resposta.data);
        navigate("/pages/aluno/listar/imc");
      })
      .catch((erro) => {
        console.error("Erro ao carregar IMCs do aluno:", erro);
      });
  }

  return (
    <div>
      <h1>Listar IMC</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>#</th>
            <th>Aluno</th>
            <th>Listar</th>
            <th>Altura</th>
            <th>Peso</th>
            <th>Imc Total</th>
            <th>Classificação</th>
            <th>Criado Em</th>
          </tr>
        </thead>
        <tbody>
          {imcs.map((imc) => (
            <tr key={imc.imcId}>
              <td>{imc.imcId}</td>
              <td>{imc.aluno.nome}</td>
              <td>
                <button
                  onClick={() => {
                    carregarImcAluno(imc.aluno.alunoId!);
                  }}
                >
                  Listar Aluno {imc.aluno.alunoId}
                </button>
              </td>
              <td>{imc.altura}</td>
              <td>{imc.peso}</td>
              <td>{imc.imcTotal}</td>
              <td>{imc.classificacao}</td>
              <td>{imc.criadoEm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarImc;
