FROM node:16.15-alpine3.16

WORKDIR /usr/app

COPY package*.json ./

COPY . .

EXPOSE 8000

CMD ["npm","run","start:dev"]