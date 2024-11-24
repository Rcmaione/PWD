import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Cadprop from "./cadprop";
import Cadchac from "./cadchaca";

export default function App() {
  const [isNavVisible, setNavVisible] = useState(true); // Estado para controlar visibilidade do menu
  const location = useLocation();

  // Oculta o nav após a navegação
  const handleLinkClick = () => {
    setNavVisible(false);
  };

  // Exibe o nav ao retornar para a página inicial
  React.useEffect(() => {
    if (location.pathname === "/") {
      setNavVisible(true);
    }
  }, [location]);

  return (
    <div>
      {isNavVisible && (
        <nav>
          <Link to="/cadprop" onClick={handleLinkClick}>
            Cadastro de Proprietários
          </Link>{" "}
          |{" "}
          <Link to="/cadchac" onClick={handleLinkClick}>
            Cadastro de Chácaras
          </Link>
        </nav>
      )}

      <Routes>
        <Route path="/cadprop" element={<Cadprop />} />
        <Route path="/cadchac" element={<Cadchac />} />
        <Route path="/" element={<h2>Você está na Página Inicial!</h2>} />
      </Routes>
    </div>
  );
}
