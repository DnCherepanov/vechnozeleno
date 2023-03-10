FROM node:lts

ENV APP_ROOT /src

WORKDIR ${APP_ROOT}
COPY package.json ${APP_ROOT}
COPY package-lock.json ${APP_ROOT}

RUN apt-get update && \
    apt-get clean

RUN npm install -g npm@9.5.0
RUN npm ci
COPY . ${APP_ROOT}

RUN npm run build

ENV HOST 0.0.0.0