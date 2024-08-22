FROM node:20

RUN mkdir -p /home/node/app/server/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app/server

COPY package*.json ./

USER node

COPY --chown=node:node . .

RUN npm install 

RUN npx prisma generate 

EXPOSE 8080

CMD ["npm","run","start:dev"]
