import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function Read() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/${id}`)
      .then((response) => setMovie(response.data))
      .catch((error) => console.error('Erro ao buscar filme:', error));
  }, [id]);

  if (!movie) return <p>Carregando...</p>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{movie.name}</h1>
      <div className="card">
        <img src={movie.capa} className="card-img-top" alt={movie.name} />
        <div className="card-body">
          <h5 className="card-title">ID: {movie.id}</h5>
          <p><strong>Gênero:</strong> {movie.genero}</p>
          <p><strong>Ano:</strong> {movie.ano}</p>
        </div>
      </div>
      <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
        Voltar para a Página Inicial
      </button>
    </div>
  );
}

export default Read;
