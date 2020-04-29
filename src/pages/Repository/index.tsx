import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronsLeft, FiChevronRight } from 'react-icons/fi';
import api from '../../services/api'


import { Header, RepositoryInfo, Issues } from './styles';
import logoImg from '../../assets/logo.svg';


interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;

  };
}


interface Issue {
  title: string;
  id: number;
  html_url: string;
  user: {
    login: string;
  }

}

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssiues] = useState<Issue[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get(`repos/${params.repository}`).then((response) => {
      setRepository(response.data)
    })

    api.get(`repos/${params.repository}/issues`).then((response) => {
      setIssiues(response.data)
    })


  }, [params.repository])

  return (
    <>
      <Header>
        <img src={logoImg} alt="github Explorer" />
        <Link to="/">
          <FiChevronsLeft size={16} />
        Voltar
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img src={repository.owner.avatar_url}
              alt={repository.owner.login} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Start</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map((issues) => (
          <a key={issues.id} href={issues.html_url}>
            <div>
              <strong>{issues.title}</strong>
              <p>{issues.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  )
}



export default Repository