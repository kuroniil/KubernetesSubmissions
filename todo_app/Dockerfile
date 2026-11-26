FROM node:alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm install

COPY . .

WORKDIR /usr/src/app/frontend

RUN npm install

RUN npm run build

WORKDIR /usr/src/app

CMD ["node", "index.js"]