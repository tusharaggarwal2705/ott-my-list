FROM node:alpine as builder

WORKDIR /usr/src/app

COPY ./ ./
COPY --chown=node:node ./ ./

RUN npm ci

RUN npm run build

FROM node:alpine as staging

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules

RUN mkdir -p /usr/src/app/assets/temp

ENV NODE_ENV=production

RUN npm prune --production

EXPOSE 5001

CMD ["npm","run","start:prod"]

