FROM node:lts-alpine

ENV APP_ROOT /nuxt-app

WORKDIR ${APP_ROOT}
COPY . ${APP_ROOT}

RUN npm install

RUN npm run build

ENV HOST 0.0.0.0