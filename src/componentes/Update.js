import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Update() {
  const [id, setId] = useState(''); // Estado para armazenar o ID do filme
  const [movie, setMovie] = useState(null); // Estado para armazenar os dados do filme
  const navigate = useNavigate();

  // Função para buscar o filme com base no ID fornecido
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get(`/${id}`);
      setMovie(response.data); // Define o filme no estado
    } catch (error) {
      console.error('Erro ao buscar filme:', error);
      alert('Filme não encontrado! Verifique o ID.');
    }
  };

  // Função para atualizar os campos do filme
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: name === "ano" ? parseInt(value) : value });
  };

  // Função para enviar a atualização para a API
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/${id}`, movie); // Envia a atualização para a API
      alert('Filme atualizado com sucesso!');
      navigate('/'); // Redireciona para a página inicial
    } catch (error) {
      console.error('Erro ao atualizar filme:', error);
      alert('Erro ao atualizar filme. Tente novamente.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Alterar Filme</h1>

      {/* Formulário para inserir o ID */}
      {!movie && (
        <form onSubmit={handleSearch} className="mt-4">
          <div className="mb-3">
            <label className="form-label">ID do Filme</label>
            <input
              type="number"
              className="form-control"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              placeholder="Digite o ID do filme"
            />
          </div>
          <button type="submit" className="btn btn-warning w-100">
            Buscar Filme
          </button>
        </form>
      )}

      {/* Formulário para editar o filme */}
      {movie && (
        <form onSubmit={handleUpdate} className="mt-4">
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
              min="0"
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
            Atualizar Filme
          </button>
        </form>
      )}
    </div>
  );
}

export default Update;
