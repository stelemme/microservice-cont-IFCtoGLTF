FROM node:19-alpine

WORKDIR /usr/src/app
COPY package*.json ./
COPY ./public ./public

CMD npm config set prefer-offline && \
    npm install && \
    npm run start:dev