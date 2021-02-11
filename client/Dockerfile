FROM node:14.14.0-alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm i
COPY . .
RUN npm run build

FROM nginx
EXPOSE 80
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=bulder /app/build /usr/share/nginx/html