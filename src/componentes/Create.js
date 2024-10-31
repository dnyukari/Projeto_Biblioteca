import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Create() {
  const [movie, setMovie] = useState({ name: '', genero: '', ano: 0, capa: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Impede que o ano seja negativo
    if (name === "ano" && value < 0) {
      return;
    }

    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!movie.name || !movie.genero || !movie.ano || !movie.capa) {
      alert('Todos os campos são obrigatórios!');
      return;
    }
    try {
      await api.post('/', movie);
      alert('Filme criado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao adicionar filme:', error);
      alert('Erro ao criar filme. Tente novamente.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Adicionar Filme</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={movie.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gênero</label>
          <input
            type="text"
            name="genero"
            className="form-control"
            value={movie.genero}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ano</label>
          <input
            type="number"
            name="ano"
            className="form-control"
            value={movie.ano}
            onChange={handleChange}
            min="0" // Impede valores negativos no input
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Capa (URL)</label>
          <input
            type="text"
            name="capa"
            className="form-control"
            value={movie.capa}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Adicionar Filme
        </button>
      </form>
    </div>
  );
}

export default Create;
