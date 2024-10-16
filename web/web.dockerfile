FROM node:20-alpine

RUN addgroup web && adduser -S -G web web

USER web 

WORKDIR /web

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]