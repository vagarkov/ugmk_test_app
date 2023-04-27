FROM node:16 AS build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
