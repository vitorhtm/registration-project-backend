# Projeto de Cadastro em Etapas – Backend

> Observação: Este README foi elaborado com auxílio de IA para facilitar a documentação.

## Descrição

Este projeto é um backend para um fluxo de cadastro dividido em etapas sequenciais. Ele permite que o usuário preencha os dados aos poucos, salvando rascunhos até concluir o cadastro.

Principais funcionalidades:

- Persistência de dados a cada etapa concluída.
- Criação e atualização de rascunhos (`draftId`).
- Controle de datas de início (`startedAt`), última atualização (`updatedAt`) e finalização (`finishedAt`) do cadastro.
- Validação dos campos obrigatórios antes da finalização.
- Retorno de mensagem de sucesso ao finalizar o cadastro.

## Tecnologias

- NestJS
- TypeORM
- PostgreSQL
- Jest
- ESLint

## Estrutura do Projeto

src/
  registration/
    entities/
    dto/
    registration.controller.ts
    registration.service.ts
    registration.module.ts

## Rotas Principais

- POST /registration – Cria um novo registro ou rascunho.
- PATCH /registration/:id/document – Atualiza documentos do registro.
- PATCH /registration/:id/contact – Atualiza dados de contato.
- PATCH /registration/:id/address – Atualiza endereço.
- PATCH /registration/:id/finish – Finaliza o cadastro.

## Configuração do Banco de Dados

Crie um arquivo .env na raiz do projeto:

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=registration_db

## Como Rodar o Projeto

1. npm install
2. npm run start:dev

O backend estará disponível em http://localhost:3000

## Testes

npm run test

## ESLint

npm run lint

## Observações

- O cadastro é persistido a cada etapa.
- O usuário pode continuar o cadastro de onde parou.
- README elaborado com auxílio de inteligência artificial.
