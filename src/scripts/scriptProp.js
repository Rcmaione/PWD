const form = document.getElementById('proprietarioForm');
        const errorMessage = document.getElementById('errorMessage');
        const usuariosTableBody = document.querySelector('#usuariosTable tbody');

        //Oculta o menu quando clicado no "hamburguer"
        document.getElementById('hamburger').addEventListener('click', function() {
        const menu = document.getElementById('menu');
        menu.classList.toggle('active'); // Alterna a classe 'active' para mostrar ou ocultar o menu
        });

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Limpar mensagem de erro
            errorMessage.style.display = 'none';
            errorMessage.textContent = '';

            // Coletar os dados do formulário
            const formData = new FormData(form);
            const senha = formData.get('password');
            const confirmSenha = formData.get('password2');

            // Verificar se as senhas coincidem
            if (senha !== confirmSenha) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'As senhas não coincidem.';
                return;
            }

            const data = {
                password: senha,  // Senha do formulário
                password2: confirmSenha,  // Confirmação da senha
                email: formData.get('email'),
                first_name: formData.get('first_name'),
                last_name: formData.get('last_name'),
                perfil: {
                    telefone: formData.get('telefone'),
                    foto: null,
                    data_nascimento: formData.get('data_nascimento'),
                    sexo: formData.get('sexo')  // Campo Sexo agora dentro de perfil
                }
            };

            try {
                // Fazer a requisição POST
                const response = await fetch('http://localhost:8000/api/v1/usuarios/registrar/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem(accessToken) // Substitua pelo token correto
                    },
                    body: JSON.stringify(data),

                });
                console.log(data);

                // Verificar a resposta
                if (response.ok) {
                    alert('Proprietário cadastrado com sucesso!');
                    form.reset();  // Limpar o formulário após o sucesso
                    await carregarUsuarios();  // Atualizar a tabela de usuários
                } else {
                    const errorData = await response.json();
                    let errors = '';
                    for (let key in errorData) {
                        errors += `${key}: ${errorData[key]}\n`;
                    }
                    throw new Error(errors);
                }
            } catch (error) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'Erro: ' + error.message;
            }
        });

        // Função para carregar os usuários existentes
        async function carregarUsuarios() {
            try {
                const response = await fetch('http://localhost:8000/api/v1/usuarios/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem(accessToken) // Substitua pelo token correto
                    }
                });

                if (response.ok) {
                    const usuarios = await response.json();
                    usuariosTableBody.innerHTML = '';  // Limpar a tabela

                    // Adicionar cada usuário na tabela
                    usuarios.forEach(usuario => {
                        console.log(usuario);
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td><a href="usuario_detalhes.html?id=${usuario.id}">${usuario.id}</a></td>
                            <td>${usuario.email}</td>
                            <td>${usuario.first_name} ${usuario.last_name}</td>  <!-- Nome Completo -->
                            <td>${usuario.perfil?.telefone || '-'}</td>
                            <td>${usuario.perfil?.data_nascimento || '-'}</td>
                            <td>${usuario.perfil?.sexo || '-'}</td>
                        `;
                        usuariosTableBody.appendChild(row);
                    });
                } else {
                    throw new Error('Erro ao carregar os usuários');
                }
            } catch (error) {
                console.error(error);
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'Erro ao carregar os usuários.';
            }
        }

        // Carregar os usuários ao carregar a página
        window.onload = carregarUsuarios;
