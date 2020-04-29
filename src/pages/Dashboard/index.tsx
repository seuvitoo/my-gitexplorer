import React, { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Respositories, Error } from './styles';



interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;

  };


}
const Dashboard: React.FC = () => {
  const [inputError, setInputError] = useState('');
  const [newRepo, setNewRepo] = useState('')
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storegedRepositories = localStorage.getItem('@GithubExplorer:repositories');
    if (storegedRepositories) {
      return JSON.parse(storegedRepositories)
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories))
  }, [repositories])

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!newRepo) return setInputError('Digite o autor/nome do repositório')

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);
      console.log(response.data);
      const repository = response.data;
      setRepositories([...repositories, repository])
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por esse repositório')
    }
  }






  return (
    <>
      <img src={logoImg} alt="GitHub Explorer" />
      <Title>Explore repositórios do github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}


      <Respositories>
        {repositories.map(repository => (
          <Link key={repository.full_name} to={`/repositories/${repository.full_name}`}>
            <img src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Respositories>
    </>
  )
}


export default Dashboard;