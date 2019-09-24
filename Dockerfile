FROM node:10

WORKDIR /app

COPY package.json /app

RUN yarn

COPY . /app

RUN yarn tsc

ENV NODE_ENV=DOCKER

EXPOSE 3000

CMD ["yarn", "start"]