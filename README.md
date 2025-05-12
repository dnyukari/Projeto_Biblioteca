# Projeto Biblioteca

## Descrição
O **Projeto Biblioteca** é uma aplicação web desenvolvida para gerenciar livros de uma biblioteca virtual. A aplicação foi criada utilizando React e foca na experiência do usuário com uma interface intuitiva e responsiva.

## Funcionalidades
- Adicionar, visualizar, editar e excluir livros da biblioteca.
- Design responsivo, adaptado para dispositivos móveis e desktops.
- Navegação dinâmica entre as páginas utilizando React Router.

## Tecnologias Utilizadas
- **React.js**: Biblioteca para construção de interfaces de usuário.
- **Axios**: Gerenciamento de requisições HTTP.
- **Bootstrap**: Framework CSS para estilização responsiva.
- **Docker**: Containerização da aplicação

## Dockerfiles Disponíveis
O projeto inclui três Dockerfiles distintos para diferentes propósitos:

### 1.Dockerfile

Utilizado para o ambiente de desenvolvimento.

#### Conteúdo:
   ```bash
   FROM node:18
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

#### Como usar:
   ```bash
   docker build -f Dockerfile -t projeto-biblioteca-dev .
   docker run -p 3000:3000 projeto-biblioteca-dev
   ```

### 2.Dockerfile.env

Utilizado para o ambiente de produção com suporte a variáveis de ambiente

#### Conteúdo:
   ```bash
   FROM node:18 AS builder
   WORKDIR /app
   COPY . .
   RUN npm install
   RUN npm run build
   FROM nginx:alpine
   RUN apk add --no-cache gettext
   WORKDIR /usr/share/nginx/html
   COPY --from=builder /app/build .
   COPY entrypoint.sh /entrypoint.sh
   RUN chmod +x /entrypoint.sh
   ENTRYPOINT ["/entrypoint.sh"]
   CMD ["nginx", "-g", "daemon off;"]
   ```

#### Script de entrada(entrypoint.sh):
   ```bash
   #!/bin/sh

   envsubst '${REACT_APP_API_URL}' < /usr/share/nginx/html/index.html > /usr/share/nginx/html/index.html.temp
   mv /usr/share/nginx/html/index.html.temp /usr/share/nginx/html/index.html

   exec "$@"
   ```

#### Como usar:
   ```bash
   Docker build -f Dockerfile.env -t projeto-biblioteca-env .
   Docker run -e REACT_APP_API_URL=https://6720e05a98bbb4d93ca6769e.mockapi.io/movies -p 80:80 projeto-biblioteca-env
   ```
Substitua https://suaapi.com/api pela URL da sua API.

### 3.Dockerfile.test

Utilizado para executar testes automatizados da aplicação.

#### Conteúdo:
   ```bash
   FROM node:18
   WORKDIR /app
   COPY . .
   RUN npm install
   RUN npm test -- --watchAll=false --passWithNoTests
   ```

#### Como usar:
   ```bash
   docker build -f Dockerfile.test -t projeto-biblioteca-test .
   docker run projeto-biblioteca-test
   ```

## Instalação e Uso
### Pré-requisitos
- Node.js instalado (versão 16 ou superior).

### Passos para instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/RaFeltrim/Projeto-Biblioteca.git
   cd Projeto-Biblioteca
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

4. Acesse o aplicativo em [http://localhost:3000](http://localhost:3000).

## Estrutura do Projeto
```
Projeto-Biblioteca/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── ...
└── package.json
```

## Licença
Este projeto está licenciado sob os termos da [MIT License](LICENSE).

---
**Autores**: Rafael Feltrim e Daniela Yukari Udo  
**Contato**: [rafeltrim@gmail.com](mailto:rafeltrim@gmail.com), [danielaudo26@gmail.com](mailto:danielaudo26@gmail.com)
