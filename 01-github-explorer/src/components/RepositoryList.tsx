import { useState, useEffect } from 'react';
import { RepositoryItem } from "./RepositoryItem";
import '../styles/repositories.scss';

//https://api.github.com/users/BManduca/repos

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  //como será um array onde terá uma listagem de repositórios, 
  //é interessante inicializar o valor do estado com um array vazio
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/users/BManduca/repos')
    .then(response => response.json())
    .then(data => setRepositories(data))
  },[]);

  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>

      <ul>   
        {repositories.map(repository => {
          return <RepositoryItem key={repository.name} repository={repository} />
        })}
      </ul>

    </section>
  )
}