import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Home() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/')
      .then((response) => setMovies(response.data))
      .catch((error) => console.error('Erro ao buscar filmes:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Minha Biblioteca de Filmes</h1>

      <div className="d-flex justify-content-center gap-3 mb-4">
        <button className="btn btn-primary" onClick={() => navigate('/')}>Início</button>
        <button className="btn btn-success" onClick={() => navigate('/create')}>Criar</button>
        <button className="btn btn-warning" onClick={() => navigate('/update')}>Alterar</button>
        <button className="btn btn-danger" onClick={() => navigate('/delete')}>Apagar</button>
      </div>

      <div className="row">
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            className="col-md-4 mb-4"
            onClick={() => navigate(`/read/${movie.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card h-100">
              <img 
                src={movie.capa || 'https://via.placeholder.com/150'} 
                className="card-img-top" 
                alt={movie.name || 'Sem Nome'} 
              />
              <div className="card-body text-center">
                <h5 className="card-title">ID: {movie.id}</h5>
                <h6 className="card-title">{movie.name || 'Sem Nome'}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
