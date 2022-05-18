# Song

## Description
Song demo Backend
- Nodejs: v15.14.0
- Framework: Nestjs
- Postgres: v13.4-alpine

## Installation

```bash
$ npm install
```

## Running the app
- Create .env file at the root. Copy content from .env.example
- Run scripts below

```bash
# migration:
$ npx prisma migrate dev

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Seed
```bash
$ npm run seed
```

## Test

- Create test database and update .env.test
- Run ```npm run test:e2e <file-name>```