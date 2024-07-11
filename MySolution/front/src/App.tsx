import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ProdutoListar />} />
          <Route path="/pages/pruduto/listar" element={<ProdutoListar />} />
          <Route
            path="/pages/produto/cadastrar"
            element={<ProdutoCadastrar />}
          />
        </Routes>
      </BrowserRouter>
      <footer>
        <p>Desenvolvido por Danilo</p>
      </footer>
    </div>
  );
}

export default App;
