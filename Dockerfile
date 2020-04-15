FROM node:12

WORKDIR /usr/src/app

RUN set -ex \
    && npm install -g pm2

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm ci

COPY ./middleware ./middleware
COPY ./routes ./routes
COPY ./models ./models
COPY ./app.js ./app.js

EXPOSE 8000

CMD ["pm2-runtime","app.js"]