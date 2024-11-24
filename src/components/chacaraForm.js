import React from "react";

export default function ChacaraForm() {
  return (
    <form id="chacaraForm">
      <div id="errorMessage" style={{ display: 'none', color: 'red' }}></div>
      <div className="form-group">
        <label htmlFor="nome">Nome</label>
        <input type="text" id="nome" name="nome" className="form-control" required />
      </div>
      <div className="form-group">
        <label htmlFor="descricao">Descrição</label>
        <textarea id="descricao" name="descricao" className="form-control" rows="4" required></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="coordenadas">Coordenadas (JSON)</label>
        <input type="text" id="coordenadas" name="coordenadas" className="form-control" placeholder='{"latitude": -23.5505, "longitude": -46.6333}' required />
      </div>
      <div className="form-group">
        <label htmlFor="foto">Foto</label>
        <input type="file" id="foto" name="foto" accept="image/*" className="form-control-file" />
      </div>
      <div className="form-group form-check">
        <input type="checkbox" id="ativo" name="ativo" className="form-check-input" checked />
        <label htmlFor="ativo" className="form-check-label">Ativo</label>
      </div>
      <button type="submit" className="btn btn-primary">Cadastrar</button>
    </form>
  );
}
