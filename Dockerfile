FROM node:10.13-alpine

WORKDIR /var/server

COPY . /var/server

RUN npm install -g typescript concurrently nodemon

RUN npm install

EXPOSE 3001

RUN tsc

CMD npm run watch
