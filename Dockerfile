FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV FAST_REFRESH=false

COPY package.json .

RUN yarn

COPY . .

CMD ["yarn", "start"]
