FROM node:16-alpine

WORKDIR /usr/app

COPY src/ ./src
COPY server.js ./
COPY public/ ./public
COPY data/ ./data
COPY package*.json ./

RUN npm install
RUN npm run build
RUN npm install -g serve

EXPOSE 3000 3001

CMD ["sh", "-c", "npm run start:server & serve -n -s build -l 3000"]