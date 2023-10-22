create table usuarios (
id serial primary key,
nome text not null,
email text unique not null,
senha text not null
);

create table categorias (
id serial primary key,
descricao text not null
);

create table produtos (
id serial primary key,
descricao text not null unique,
quantidade_estoque integer,
valor integer,
categoria_id integer references categorias(id)
);

create table clientes (
id serial primary key,
nome text not null,
email text not null unique,
cpf char(11) not null unique,
cep text,
rua text,
numero integer,
bairro text,
cidade text,
estado varchar(2)
);

insert into categorias (descricao)
values
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

insert into produtos (descricao, quantidade_estoque, valor, categoria_id)
values
('Notebook', 1, 300000, 1),
('Mouse', 1, 5000, 1),
('Teclado', 1, 8000, 1),
('Smartphone', 1, 100000, 2),
('Capa de celular', 1, 1500, 2),
('Fone de ouvido', 1, 3000, 2),
('Perfume', 1, 10000, 3),
('Creme hidratante', 1, 2800, 3),
('Batom', 1, 1500, 3),
('Arroz Integral', 1, 1800, 4),
('Feijão Preto', 1, 800, 4),
('Óleo de Cozinha', 1, 700, 4),
('Dom Quixote', 1, 4000, 5),
('Caderno Universitário', 1, 3500, 5),
('Canetas Coloridas', 1, 500, 5),
('Quebra-Cabeça', 1, 7000, 6),
('Bola de Futebol', 1, 4000, 6),
('Boneca de Pelúcia', 1, 10000, 6),
('Camiseta Básica', 1, 8300, 7),
('Calça Jeans', 1, 9900,7),
('Tênis Esportivo', 1, 2700,7),
('Fraldas Descartáveis', 1, 8000, 8),
('Mamadeira', 1, 3500, 8),
('Chupeta', 1, 2900, 8);