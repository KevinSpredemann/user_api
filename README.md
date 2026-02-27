# Sistema de Usuários com Autenticação JWT

Projeto backend em **NestJS** para gerenciamento de usuários, com autenticação JWT e proteção de rotas sensíveis.

O banco de dados utilizado é **MySQL hospedado no Railway**.

---

## Tecnologias

- Node.js  
- NestJS  
- TypeScript  
- MySQL (Railway)  
- TypeORM  
- JWT (JSON Web Tokens)  
- class-validator / class-transformer  
- bcrypt para hashing de senhas  

---

## Instalação e Configuração

1. Clone o repositório:  
```bash
git clone https://seu-repositorio.git
cd nome-do-projeto
````
## Instale as dependências:

```bash
npm install
````

## Configure o arquivo .env com as variáveis do Railway e do JWT:

```bash
MYSQLHOST=maglev.proxy.rlwy.net
MYSQLPORT=34378
MYSQLUSER=root
MYSQLPASSWORD=NzmNtsTzeDGDwCjjBPfVpWcXpQUzbSyc
MYSQLDATABASE=railway
JWT_SECRET=doaodho322rb234br2f
PORT=3000
````

## Execução

## Em desenvolvimento:

```bash
npm run start:dev
````

## Em produção:

```bash
npm run build
npm run start:prod
````

## O servidor vai rodar na porta definida no .env (PORT=3000).

## Fluxo de Uso e Teste das Rotas
### 1. Criar Usuário

### Endpoint: POST /users

## Corpo da requisição (CreateUserDTO):

```bash
{
  "name": "Kevin Ruan",
  "username": "kevin22",
  "email": "kevin@example.com",
  "password": "123456"
}
````

### O retorno do usuário não inclui a senha.

## 2. Autenticar Usuário

### Endpoint: POST /auth/login

## Corpo da requisição (AuthLoginDTO):

```bash
{
  "email": "kevin@example.com",
  "password": "123456"
}
````

### Resposta esperada:

```bash
{
  "access_token": "JWT_TOKEN_AQUI"
}
````

## 3. Testar rotas protegidas

### Todas as rotas de GET, PATCH e DELETE em /users estão protegidas pelo JwtAuthGuard.
Para acessá-las, inclua o header:

```bash
Authorization: Bearer JWT_TOKEN_AQUI
````

## Exemplos de rotas protegidas

### Buscar usuário por ID

### GET /users/1

```bash
Authorization: Bearer JWT_TOKEN_AQUI
````

### Buscar usuário por email

### GET /users/email?email=kevin@example.com

```bash
Authorization: Bearer JWT_TOKEN_AQUI
````

### Atualizar usuário

### PATCH /users/1

```bash
Authorization: Bearer JWT_TOKEN_AQUI
````

### Corpo da requisição (UpdateUserDTO):

```bash
{
  "name": "Kevin Ruan Updated"
}
````

### Deletar usuário

### DELETE /users/1

```bash
Authorization: Bearer JWT_TOKEN_AQUI
````
