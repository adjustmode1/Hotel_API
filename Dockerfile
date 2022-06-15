FROM node:16.15-alpine3.16

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3500

CMD ["npm","run","start:dev"]

