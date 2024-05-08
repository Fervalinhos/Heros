# API de Anti-Heróis

Esta é uma API RESTful simples para gerenciar anti-heróis e batalhas entre eles. Utiliza Express.js para o servidor e PostgreSQL para o banco de dados.

## Instalação

1. Clone o repositório.
2. Instale as dependências com `npm install`.
3. Configure o seu banco de dados PostgreSQL e atualize os detalhes de conexão em `app.js`.
4. Inicie o servidor com `npm start`.

## Endpoints

### Anti-Heróis

#### GET /anti_heroes

- Descrição: Obter uma lista de todos os anti-heróis.
- Resposta:
  - Status 200 OK:
    ```json
    {
        "status": "success",
        "message": "Lista de anti-heróis",
        "total": <número>,
        "data": [<dados do anti-herói>]
    }
    ```

#### GET /anti_heroes/:id

- Descrição: Obter detalhes de um anti-herói específico por ID.
- Resposta:
  - Status 200 OK:
    ```json
    {
        "status": "success",
        "message": "Anti-Herói encontrado",
        "total": <número>,
        "data": [<dados do anti-herói>]
    }
    ```

#### GET /anti_heroes/name/:name

- Descrição: Pesquisar anti-heróis pelo nome.
- Resposta:
  - Status 200 OK:
    ```json
    {
        "status": "success",
        "message": "Anti-Herói encontrado",
        "total": <número>,
        "data": [<dados do anti-herói>]
    }
    ```

#### POST /anti_heroes

- Descrição: Adicionar um novo anti-herói.
- Corpo da Requisição:
  ```json
  {
      "name": "<nome do anti-herói>",
      "power": "<nível de poder>",
      "experience": "<nível de experiência>",
      "lvl": "<nível>",
      "health": "<pontos de vida>",
      "attack": "<pontos de ataque>"
  }
