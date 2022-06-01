FROM node:lts-alpine

RUN apt-get update

ENV APP_ROOT /src

WORKDIR ${APP_ROOT}
COPY . ${APP_ROOT}

RUN npm install
RUN npm run build

ENV HOST 0.0.0.0