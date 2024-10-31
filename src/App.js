import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './componentes/Home';
import Create from './componentes/Create';
import Update from './componentes/Update';  // Componente Update corrigido
import Delete from './componentes/Delete';
import Read from './componentes/Read';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">Catálogo de Filmes</a>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update" element={<Update />} />  {/* Página de Alteração */}
        <Route path="/delete" element={<Delete />} />
        <Route path="/read/:id" element={<Read />} />
      </Routes>
      <footer className="footer bg-dark text-white text-center py-3">
        &copy; 2024 Catálogo de Filmes - Todos os direitos reservados.
      </footer>
    </BrowserRouter>
  );
}

export default App;
