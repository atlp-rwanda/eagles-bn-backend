FROM node:12.19.0

ARG PORT

WORKDIR /usr/app

COPY package*.json ./

RUN npm install 

COPY . .

COPY .env.example .env

EXPOSE $PORT

CMD [ "npm", "run", "start"]
