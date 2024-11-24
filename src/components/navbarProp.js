import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/imagens/logonav.png';
import '../assets/stylesdef.css';

const Navbar = () => {
  const location = useLocation();

  useEffect(() => {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');

    const toggleMenu = () => {
      if (menu) {
        menu.classList.toggle('active'); // Alterna a classe 'active' para mostrar/ocultar o menu
      }
    };

    // Adiciona o evento de clique ao "hamburger"
    if (hamburger) {
      hamburger.addEventListener('click', toggleMenu);
    }

    // Remove o evento de clique na desmontagem
    return () => {
      if (hamburger) {
        hamburger.removeEventListener('click', toggleMenu);
      }
    };
  }, [location]); // Reexecuta o efeito sempre que o caminho da URL muda

  // Fecha o menu ao clicar em um link
  const closeMenu = () => {
    const menu = document.getElementById('menu');
    if (menu && menu.classList.contains('active')) {
      menu.classList.remove('active');
    }
  };

  return (
    <div className="navbar">
        <div id="logo">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </div>
        <div className="hamburger" id="hamburger">&#9776;</div>

        <div className="menu" id="menu">
          <Link to="/">Início</Link>

          <div className="dropdown" id="dp1">
            <Link to="/cadchac" className="dropbtn" onClick={closeMenu}>Chácaras</Link>
            <div className="dropdown-content" id="dp1-content">
              <Link to="/cadchac">Cad. Chácaras</Link>
            </div>
          </div>          

          <div className="dropdown">
            <Link to="/prop" className="dropbtn" onClick={closeMenu}>Proprietários</Link>
            <div className="dropdown-content">
              <Link to="/cadvisitante" onClick={closeMenu}>Cad. Visitantes</Link>
            </div>
          </div>
          <Link to="#" onClick={closeMenu}>Configurações</Link>
        </div>
      </div>
  );
};

export default Navbar;
