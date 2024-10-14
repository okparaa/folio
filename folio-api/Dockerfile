FROM node:20-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install --omit=dev

EXPOSE 3000

CMD [ "npm", "start" ]