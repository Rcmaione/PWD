import React, { useState } from "react";
import "./stylesdef.css";
import { Link } from 'react-router-dom';
import Navbar from "../components/navbarChac";
import ChacaraForm from "../components/chacaraForm";
import Footer from "../components/footer";

export default function Cadchac() {
  return (
    <>
      <Navbar></Navbar>
      <div className="container mt-5">
        <h2>Cadastrar Chácara</h2>
      <ChacaraForm></ChacaraForm>
        <h3 className="mt-5">Chácaras Cadastradas</h3>
        <table id="chacarasTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Coordenadas</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      <Footer></Footer>
      </div>
    </>
  );
}
