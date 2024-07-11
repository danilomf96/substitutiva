import { Aluno } from "./Aluno";

export interface Imc{
    criadoEm?: string
    imcId?: string;
    altura: number;
    peso: number; 
    imcTotal: number;
    classificacao: string;
    grauObesidade: string;
    aluno: Aluno;
    alunoId: string;
}