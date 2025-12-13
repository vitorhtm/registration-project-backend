# Projeto de Cadastro em Etapas – Backend

> Observação: Este README foi elaborado com auxílio de IA para facilitar a documentação.

## Descrição

Este projeto é um backend para um fluxo de cadastro dividido em etapas sequenciais. Ele permite que o usuário preencha os dados aos poucos, salvando rascunhos até concluir o cadastro.

Principais funcionalidades:

- Persistência de dados a cada etapa concluída.
- Criação e atualização de rascunhos.
- Controle de datas de início, atualização e finalização do cadastro.
- Validação dos campos obrigatórios antes da finalização.
- Retorno de mensagem de sucesso ao finalizar o cadastro.

## Tecnologias

- **NestJS** – Framework backend.
- **TypeORM** – ORM para banco de dados.
- **PostgreSQL** (ou outro banco suportado pelo TypeORM)
- **Jest** – Testes unitários.

## Estrutura do Projeto

```
src/
  registration/
    entities/
    dto/
    registration.controller.ts
    registration.service.ts
    registration.module.ts
```

## Rotas Principais

- `POST /registration` – Cria um novo registro ou rascunho.
- `PATCH /registration/:id/document` – Atualiza documentos do registro.
- `PATCH /registration/:id/contact` – Atualiza dados de contato.
- `PATCH /registration/:id/address` – Atualiza endereço (busca automática pelo CEP).
- `PATCH /registration/id/finish` – Finaliza o cadastro, validando todos os campos obrigatórios.

## Como Rodar o Projeto

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd <nome-do-repositorio>
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o banco de dados no arquivo `.env`.

4. Rode as migrações (se houver):

```bash
npm run typeorm migration:run
```

5. Inicie o servidor:

```bash
npm run start:dev
```

O backend estará disponível em `http://localhost:3000`.

## Testes

Execute os testes unitários com:

```bash
npm run test
```

Os testes cobrem:

- Criação de registros e rascunhos.
- Atualização de registros.
- Finalização do cadastro com validação de campos obrigatórios.
- Controle de datas de início, atualização e finalização.

## Observações

- Cada registro possui um `draftId` para controlar rascunhos.
- O cadastro é persistido a cada etapa, garantindo que o usuário possa continuar de onde parou.
- A finalização valida todos os campos obrigatórios e retorna uma mensagem de sucesso.
- Este README foi elaborado com auxílio de inteligência artificial, garantindo cla