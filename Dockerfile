FROM node:16.14.0
WORKDIR /usr/src/app
COPY src ./src
COPY .env ./
COPY package*.json ./
COPY tsconfig.json ./
RUN npm i
EXPOSE 8080
CMD ["npm","run","prod"]