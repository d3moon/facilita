
# Desafio - Facilita Jurídico [Backend]

Descrição do Projeto:
A empresa de limpeza residencial busca uma solução eficiente para o gerenciamento de clientes e a otimização de rotas de atendimento. O sistema consiste em um backend em Node.js com PostgreSQL como banco de dados e um frontend em React.

## Funcionalidades:
Gerenciamento de Clientes:

- Listagem de clientes com opção de filtro por nome, e-mail ou telefone.
- Cadastro de novos clientes com informações como nome, e-mail, telefone.

-  Otimização de Rotas:
    - Utiliza um mapa bidimensional onde cada cliente possui coordenadas X e Y.
    - Calcula a rota mais eficiente partindo da empresa (0,0) passando por todos os clientes e retornando à empresa.


**Tecnologias Utilizadas:**

- Backend:
    - Node.js
    - Express
    - PostgreSQL

## Instalação e Execução:
Configuração do Banco de Dados:
1. Crie um banco de dados e uma tabela chamada clientes no PostgreSQL.
2. Configure as credenciais de username, password e database do banco criando o arquivo .env

```bash
USERNAME=""
PASSWORD=""
DATABASE=""
```

Backend:
1.  Acesse o diretório backend: cd facilita
2. Instale as dependências: 
```bash
npm install
```
3. Inicie o servidor backend:
```bash
npm start
```