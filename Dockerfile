
   
FROM node:16-alpine as build

WORKDIR /build

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run prisma:generate

RUN npm run build

FROM node:16-alpine

USER node
COPY --chown=node:node --from=build /build/prisma ./

COPY --chown=node:node --from=build /build/dist ./dist

COPY --chown=node:node --from=build /build/node_modules ./node_modules

ENTRYPOINT ["node", "./dist/main"]