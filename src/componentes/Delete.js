import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Delete() {
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!id) {
      alert('Por favor, insira um ID válido.');
      return;
    }
    try {
      await api.delete(`/${id}`);
      alert('Filme apagado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao apagar filme:', error);
    }
  };

  return (
    <div className="delete-container">
      <h1>Apagar Filme</h1>
      <input
        type="text"
        placeholder="Digite o ID do filme"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleDelete}>Apagar Filme</button>
    </div>
  );
}

export default Delete;
