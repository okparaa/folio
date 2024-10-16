FROM node:20-alpine

RUN addgroup api && adduser -S -G api api

WORKDIR /api

COPY package*.json ./

COPY . .

RUN npm install \
    && npm install typescript -g \
    && tsc \
    && npm run gen

USER api 

EXPOSE 3001

CMD [ "npm", "start" ]