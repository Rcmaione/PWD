import React, { useState } from "react";
import "./stylesdef.css";
import { Link } from 'react-router-dom';
import Navbar from "../components/navbarProp";
import Footer from "../components/footer";

export default function Cadprop() {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    cpf: "",
    data_nascimento: "",
    telefone: "",
    sexo: "",
    senha: "",
    confirm_senha: ""
  });

  // Função para atualizar os dados do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
    console.log("Dados do formulário:", formData);
  };

  return (
    <>
      <Navbar></Navbar>
      <h2>Cadastrar Proprietário</h2>

      <form id="proprietarioForm" onSubmit={handleSubmit}>
        <div className="error" id="errorMessage"></div>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="first_name">Primeiro Nome</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="last_name">Sobrenome</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="cpf">CPF</label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          required
          placeholder="Somente números"
          maxLength="11"
        />

        <label htmlFor="data_nascimento">Data de Nascimento</label>
        <input
          type="date"
          id="data_nascimento"
          name="data_nascimento"
          value={formData.data_nascimento}
          onChange={handleChange}
        />

        <label htmlFor="telefone">Telefone</label>
        <input
          type="text"
          id="telefone"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          maxLength="11"
        />

        <label htmlFor="sexo">Sexo</label>
        <select
          id="sexo"
          name="sexo"
          value={formData.sexo}
          onChange={handleChange}
          required
        >
          <option value="" disabled selected>Selecione seu sexo</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
        </select>

        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          id="senha"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          required
        />

        <label htmlFor="confirm_senha">Confirme a Senha</label>
        <input
          type="password"
          id="confirm_senha"
          name="confirm_senha"
          value={formData.confirm_senha}
          onChange={handleChange}
          required
        />

        <button type="submit">Cadastrar</button>
      </form>

      <h3>Usuários Cadastrados</h3>
      <table id="usuariosTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Nome Completo</th>
            <th>Telefone</th>
            <th>Data Nascimento</th>
            <th>Sexo</th>
          </tr>
        </thead>
        <tbody>
          {/* Usuários serão inseridos aqui */}
        </tbody>
      </table>
      <Footer></Footer>
    </>
  );
}
