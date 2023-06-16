FROM node:19-alpine

WORKDIR /usr/src/app
COPY package*.json ./
COPY ./public ./public
COPY ./src ./src

CMD npm install && \
    npm run start