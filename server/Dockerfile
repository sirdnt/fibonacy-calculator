FROM node:14.14.0-alpine

WORKDIR '/app'

COPY ./package.json .

RUN npm i -g nodemon

RUN npm i

COPY . .

EXPOSE 5000

CMD ["node", "index"]