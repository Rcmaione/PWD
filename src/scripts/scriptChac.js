import React, { useState, useEffect, useRef } from 'react';

// Componente de cadastro de chácara
export default function ChacaraForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const [chacaras, setChacaras] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    carregarChacaras();
    // Alternar o menu ao clicar no hambúrguer
    const menuToggle = () => {
      const menu = document.getElementById('menu');
      menu.classList.toggle('active');
    };
    document.getElementById('hamburger').addEventListener('click', menuToggle);

    return () => {
      document.getElementById('hamburger').removeEventListener('click', menuToggle);
    };
  }, []);

  const carregarChacaras = async () => {
    setErrorMessage('');
    try {
      const response = await fetch('http://localhost:8000/api/v1/chacara/', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        },
      });

      if (response.ok) {
        const data = await response.json();
        setChacaras(data);
      } else {
        throw new Error('Erro ao carregar as chácaras');
      }
    } catch (error) {
      setErrorMessage('Erro ao carregar as chácaras.');
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    const formData = new FormData(formRef.current);
    const coordenadasInput = formData.get('coordenadas')?.trim();
    let coordenadas = null;

    if (coordenadasInput) {
      try {
        coordenadas = JSON.parse(coordenadasInput);
        if (typeof coordenadas.latitude !== 'number' || typeof coordenadas.longitude !== 'number') {
          throw new Error('As coordenadas devem conter valores válidos de latitude e longitude.');
        }
      } catch (e) {
        setErrorMessage('Erro: Coordenadas inválidas.');
        return;
      }
    }

    const data = {
      nome: formData.get('nome'),
      descricao: formData.get('descricao'),
      coordenadas: coordenadas,
    };

    const fotoFile = formData.get('foto');
    if (fotoFile) {
      data.foto = fotoFile;
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/chacara/registrar/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        },
      });

      if (response.ok) {
        alert('Chácara cadastrada com sucesso!');
        formRef.current.reset();
        await carregarChacaras();
      } else {
        const errorText = await response.text();
        setErrorMessage(`Erro ao cadastrar chácara: ${errorText}`);
      }
    } catch (error) {
      setErrorMessage('Erro: ' + error.message);
    }
  };

  return (
    <div>
      <form id="chacaraForm" ref={formRef} onSubmit={handleSubmit}>
        {errorMessage && <div id="errorMessage" style={{ color: 'red' }}>{errorMessage}</div>}
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" name="nome" required />
        </div>
        <div>
          <label htmlFor="descricao">Descrição:</label>
          <input type="text" id="descricao" name="descricao" required />
        </div>
        <div>
          <label htmlFor="coordenadas">Coordenadas:</label>
          <input type="text" id="coordenadas" name="coordenadas" placeholder='{"latitude": 0, "longitude": 0}' />
        </div>
        <div>
          <label htmlFor="foto">Foto:</label>
          <input type="file" id="foto" name="foto" />
        </div>
        <button type="submit">Cadastrar Chácara</button>
      </form>

      <table id="chacarasTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Coordenadas</th>
            <th>Ativo</th>
            <th>Editar</th>
            <th>Excluir</th>
            <th>Foto</th>
          </tr>
        </thead>
        <tbody>
          {chacaras.map(chacara => (
            <tr key={chacara.id}>
              <td><a href={`http://localhost:8000/api/v1/chacara/${chacara.id}`}>{chacara.id}</a></td>
              <td>{chacara.nome}</td>
              <td>{chacara.descricao}</td>
              <td>{JSON.stringify(chacara.coordenadas)}</td>
              <td>{chacara.ativo ? 'Sim' : 'Não'}</td>
              <td><a href={`editar_chacara.html?id=${chacara.id}`}>Editar</a></td>
              <td><a href={`excluir_chacara.html?id=${chacara.id}`}>Excluir</a></td>
              <td>{chacara.foto ? <img src={chacara.foto} alt="Foto" width="100" /> : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
