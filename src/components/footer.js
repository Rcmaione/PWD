import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/stylesdef.css';

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer-container">
          <div className="footer-item">
            <h4>Sobre Nós</h4>
            <p>Informações sobre a empresa, missão e visão.</p>
          </div>
          <div className="footer-item">
            <h4>Serviços</h4>
            <ul>
              <li><a href="#">Serviço 1</a></li>
              <li><a href="#">Serviço 2</a></li>
              <li><a href="#">Serviço 3</a></li>
            </ul>
          </div>
          <div className="footer-item">
            <h4>Contato</h4>
            <p>Email: contato@empresa.com</p>
            <p>Telefone: (00) 0000-0000</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Sua Empresa. Todos os direitos reservados.</p>
        </div>
      </footer>
  );
};

export default Footer;
