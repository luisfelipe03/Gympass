# 🏋️ Gympass Clone

## 📖 **Sobre o Projeto**

Este projeto é uma aplicação de backend que simula funcionalidades de um sistema estilo **Gympass**, permitindo que usuários se cadastrem, façam check-ins em academias, e acompanhem seu histórico, enquanto administradores podem gerenciar academias e validar check-ins.

---

## 🚀 **Funcionalidades**

### ✅ **Requisitos Funcionais (RFs)**

- [ ] Cadastro de usuários;
- [ ] Autenticação de usuários;
- [ ] Obtenção do perfil do usuário logado;
- [ ] Visualização do número de check-ins realizados pelo usuário logado;
- [ ] Histórico de check-ins do usuário;
- [ ] Busca de academias próximas;
- [ ] Busca de academias pelo nome;
- [ ] Realização de check-in em uma academia;
- [ ] Validação de check-in (admin);
- [ ] Cadastro de academias (admin).

### 🔐 **Regras de Negócio (RNs)**

- [ ] E-mail do usuário deve ser válido e único;
- [ ] Não é permitido realizar dois check-ins no mesmo dia;
- [ ] Check-in permitido apenas dentro de um raio de 100m da academia;
- [ ] Check-in válido por até 20 minutos após a criação;
- [ ] Apenas administradores podem validar check-ins;
- [ ] Apenas administradores podem cadastrar academias.

### 🛠 **Requisitos Não Funcionais (RNFs)**

- [ ] Senhas armazenadas de forma criptografada;
- [ ] Persistência de dados utilizando **PostgreSQL**;
- [ ] Paginação com 20 itens por página;
- [ ] Autenticação baseada em **JWT**.

---

## 🛠 **Tecnologias Utilizadas**

| Ferramenta          | Descrição                                    |                                                |
|----------------------|----------------------------------------------|-----------------------------------------------|
| **Node.js**          | Runtime JavaScript para o servidor.         | ![Node.js](https://skillicons.dev/icons?i=nodejs) |
| **TypeScript**       | Superconjunto de JavaScript tipado.         | ![TypeScript](https://skillicons.dev/icons?i=typescript) |
| **Fastify**          | Framework web rápido e eficiente.           | ![Fastify](https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastify/fastify-original.svg) |
| **Prisma**           | ORM moderno e poderoso para Node.js.        | ![Prisma](https://skillicons.dev/icons?i=prisma) |
| **PostgreSQL**       | Banco de dados relacional confiável.         | ![PostgreSQL](https://skillicons.dev/icons?i=postgres) |

---

## 🔧 **Como Configurar e Executar**

### Pré-requisitos

Certifique-se de ter instalado:

- **[Node.js](https://nodejs.org/)** (v16 ou superior);
- **[PostgreSQL](https://www.postgresql.org/)**.

### Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/luisfelipe03/gympass.git
   cd gympass
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o banco de dados:

   - Crie um arquivo `.env` baseado no `.env.example` fornecido.
   - Atualize as variáveis de ambiente conforme necessário.

4. Rode as migrações do banco de dados:

   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor:

   ```bash
   npm run dev
   ```

6. Acesse a aplicação em: **`http://localhost:3000`**.

---

## 📝 **Roadmap**

- [ ] Implementação completa dos RFs;
- [ ] Testes unitários e de integração;
- [ ] Configuração de deploy automático.

---

## 📚 **Contribuindo**

Contribuições são bem-vindas! Por favor, envie suas sugestões e melhorias por meio de issues ou pull requests.

---

## 🖊 **Licença**

Este projeto é licenciado sob a **[MIT License](LICENSE)**.

---

Com isso, seu README está mais visual e informativo! Se precisar de ajuda com imagens personalizadas ou ajustes, é só avisar. 😊
