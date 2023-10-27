<h1 align="center"> VendiX </h1>
<p align="center">
<img loading="lazy" src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge"/>
</p>

## 🚀 Acompanhe o Projeto

O objetivo deste projeto é criar uma API para um PDV (Frente de Caixa).

<i>Link do deploy: https://funny-sun-hat-bull.cyclic.cloud/</i>

<!--
<p>Este projeto foi proposto como desafio final do curso de Desenvolvimento de Software com Foco em Backend, ofertado pela Cubos Academy em parceria com o Ifood.</p>

<i>Trello utilizado pelo grupo: https://trello.com/b/UznHg8RW/five-devs-desenvolvimento-pdv</i> -->

## Índice

- <a href="#hammer-funcionalidades-do-projeto"> Funcionalidades do projeto </a>

- <a href="#📋-como-rodar-este-projeto"> Como rodar este projeto</a>

- <a href="#🛠️-tecnologias-utilizadas">Tecnologias utilizadas</a>

- <a href="#controle-de-versão"> Controle de versão </a>

- <a href="#✒️-autores"> Autores </a>

## :hammer: Funcionalidades do projeto
<h3> 📌 Sprint 1 </h3>

<details>
<summary>  Listar categorias </summary>

`GET` `/categoria`

<i>https://funny-sun-hat-bull.cyclic.cloud/categoria</i>

Permite listar todas as categorias dos produtos cadastradas no banco de dados.

 <p> * Informática  * Celulares  * Beleza e Perfumaria * Mercado * Livros e Papelaria * Brinquedos * Moda * Bebê * Jogos

![respostaListarCategorias](./src/assets/respostaListarCategorias.png)
</details>

<details>
<summary>   Cadastrar usuário</summary>
 
`POST` `/usuario`

<i>https://funny-sun-hat-bull.cyclic.cloud/usuario</i>

Esta funcionalidade será utilizada para cadastrar um novo usuário no sistema.

![CadastrarUsuario](./src/assets/CadastrarUsuario.png)
</details>

<details>
<summary>   Efetuar login do usuário </summary>
 
`POST` `/login`

<i>https://funny-sun-hat-bull.cyclic.cloud/login</i>

Esta funcionalidade permite o usuário cadastrado realizar o login no sistema.

![Login](./src/assets/Login.png)

⚠️ Para detalhar ou editar o perfil do usuário será exigido um token de autenticação no header da requisição
</details>

<details>
<summary>   Detalhar perfil do usuário </summary>
`GET` `/usuario`

<i>https://funny-sun-hat-bull.cyclic.cloud/usuario</i>

Essa funcionalidade permite o usuário logado a visualizar os dados do seu próprio perfil, de acordo com a validação do token de autenticação.

![respostaDetalharUsuario](./src/assets/respostaDetalharUsuario.png)
</details>

<details>
<summary>   Editar perfil do usuário logado</summary>
`PUT` `/usuario`:

<i>https://funny-sun-hat-bull.cyclic.cloud/usuario</i>

Essa funcionalidade permite o usuário logado atualizar informações de seu próprio cadastro, de acordo com a validação do token de autenticação.

![editarUsuario](./src/assets/editarUsuario.png)
</details>
<br>
<h3> 📌 Sprint 2 </h3>

<details>
<summary>   Cadastrar Produtos</summary>
 
`POST` `/produto` 

Permite ao usuário logado cadastrar um novo produto no sistema. É possivel tambem vincular uma imagem a um produto.

</details>

<details>
<summary>   Editar dados do produto </summary>
 
`PUT` `/produto/:id`

 Permite o usuário logado a atualizar as informações de um produto cadastrado.
</details>

<details>
<summary>   Listar produtos </summary>
 
`GET` `/produto`

Essa é a rota que será chamada quando o usuário logado quiser listar todos os produtos cadastrados
</details>

<details>
<summary>   Detalhar Produto </summary>
 
`GET` `/produto/:id`

Permite o usuário logado obter um de seus produtos cadastrados, pesquisando pelo id.
</details>

<details>
  <summary>   Excluir Produto por ID </summary>
 
  `DELETE` `/produto/:id`
  
   Essa é a rota que será chamada quando o usuário logado quiser excluir um de seus produtos cadastrados. Quando o produto for excluído também será removida a imagem vinculada a ele na servidor de armazenamento.
</details>

<details>
   <summary>  Cadastrar Cliente </summary>
 
   `POST` `/cliente`

   Permite usuário logado cadastrar um novo cliente no sistema.
</details>

<details>
   <summary>Editar dados do cliente</summary>
 
  `PUT` `/cliente/:id`

  Permite o usuário realizar atualização de um cliente cadastrado.
</details>

<details>
   <summary>Listar Clientes</summary>
 
  `GET` `/cliente`

  Essa é a rota que será chamada quando o usuário logado quiser listar todos os clientes cadastrados.
</details>

<details>
   <summary> Detalhar Cliente </summary>
 
  `GET` `/cliente/:id`

  Essa é a rota que será chamada quando o usuário logado quiser obter um de seus clientes cadastrados.
</details>

<br>
<h3> 📌 Sprint 3 </h3>
<details>
   <summary>Cadastrar Pedidos</summary>
 
  `POST` `/pedido`

  Permite cadastrar um novo pedido no sistema.  Após o pedido ser registrado, será enviado um e-mail para o cliente notificando que o pedido foi efetuado com sucesso.   
</details>

<details>
   <summary>Listar Pedidos</summary>
 
  `GET` `/pedido`

  Permite listar todos os pedidos cadastrados. É possível listar todos os pedidos efetuados, e tambem filtrar os pedidos realizados por um determinado cliente pelo cliente_id. 
</details>



## 📋 Como rodar este projeto

```bash

# A aplicação pode ser acessada pelo link do Deploy.
https://funny-sun-hat-bull.cyclic.cloud/

# Segue abaixo outra maneira de acessar o VendiX.

# Clone este repositório
$ git clone https://github.com/isadeop/VendiX

# Acesse a pasta do projeto no seu terminal
$ cd VendiX

# Instale as dependências
$ npm install

# Execute a aplicação
$ npm run start

# A aplicação será iniciada na porta 3000: http://localhost:3000


```

## 🛠️ Tecnologias utilizadas

1. [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
2. [Node](https://nodejs.org/pt-br/about)
3. [ElephantSQL](https://www.elephantsql.com/docs/index.html)
4. [Insomnia](https://docs.insomnia.rest/insomnia/get-started)

## Controle de versão

1.0.0.0

## ✒️ Autores

- **Alaene Pereira** - https://github.com/alaenepereira
- **Amanda Santos** - https://github.com/amandasantos05
- **Cristiane Nutini** - https://github.com/CrisNutini
- **Helen Cristina Araujo** - https://github.com/helen-araujo
- **Isadora de Oliveira** - https://github.com/isadeop
