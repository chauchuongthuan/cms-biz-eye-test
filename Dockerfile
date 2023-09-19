#stage 1

FROM node:16.19 as node

WORKDIR /app

COPY . .

COPY package.json .
COPY nginx.conf .
RUN npm cache clean --force

RUN npm install @angular/cli --location=global

RUN yarn

RUN yarn build  --output-path=cms-dev --output-hashing=all

#stage 2

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY  --from=node /app/cms-dev /usr/share/nginx/html

EXPOSE 80