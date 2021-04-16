import React, { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';

import {
  Cadastrados,
  Container,
  Conteudo,
  Detalhe,
  Formulario,
} from './styles';

interface DadosCadastrados {
  novaDisciplina: string;
  novoProfessor: string;
  novoDiaSemana: string;
  novoPeriodo: string;
  novoHorario: string;
}

const Dashboard: React.FC = () => {
  const [novaDisciplina, setNovaDisciplina] = useState('');
  const [novoProfessor, setNovoProfessor] = useState('');
  const [novoDiaSemana, setDiaSemana] = useState('');
  const [novoPeriodo, setNovoPeriodo] = useState('');
  const [novoHorario, setNovoHorario] = useState('');
  const [ErroForm, setErroForm] = useState(false);

  const [repositories, setRepositories] = useState<DadosCadastrados[]>(() => {
    const storagedRepositories = localStorage.getItem('@Professores');

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('@Professores', JSON.stringify(repositories));
  }, [repositories]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (
      novaDisciplina === '' ||
      novoProfessor === '' ||
      novoDiaSemana === '' ||
      novoPeriodo === '' ||
      novoHorario === ''
    ) {
      setErroForm(true);
    } else {
      const response = {
        novaDisciplina,
        novoProfessor,
        novoDiaSemana,
        novoPeriodo,
        novoHorario,
      };

      const repository = response;

      setRepositories([...repositories, repository]);
      setErroForm(false);
    }
  }

  return (
    <Container>
      <Conteudo>
        <Formulario>
        <img src={logoImg} alt="GoBarber" /> 
         
          <form onSubmit={handleSubmit}>
            <input
              value={novaDisciplina}
              onChange={e => setNovaDisciplina(e.target.value)}
              placeholder="Digite o nome da Disciplina"
            />
            <input
              value={novoProfessor}
              onChange={e => setNovoProfessor(e.target.value)}
              placeholder="Digite o nome do Professor"
            />
            <input
              value={novoDiaSemana}
              onChange={e => setDiaSemana(e.target.value)}
              placeholder="Digite o dia da semana"
            />
            <input
              value={novoPeriodo}
              onChange={e => setNovoPeriodo(e.target.value)}
              placeholder="Digite o Periodo"
            />
            <input
              value={novoHorario}
              onChange={e => setNovoHorario(e.target.value)}
              placeholder="Digite o horario da aula"
            />

            <button type="submit">Cadastrar</button>
        

            {ErroForm && `Preencha o formulario corretamente !`}
            
          </form>
        </Formulario>
        <Detalhe />
        <Cadastrados>
          <strong>Professores cadastrados:</strong>
          {repositories.map(repository => (
            <Link
              key={repository.novoProfessor}
              to={`/detalhes/${repository.novoProfessor}`}
            >
              <p>Professor: {repository.novoProfessor}</p>
              
              <button type="submit">Detalhes</button>
              
            </Link>
          ))}
        </Cadastrados>

        
      </Conteudo>
    </Container>
  );
};

export default Dashboard;