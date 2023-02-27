FROM node:18.4.0-alpine

WORKDIR /api

COPY . .
RUN yarn install --production

RUN ln -sf /dev/stdout /logs/debug.log

EXPOSE 8080

CMD [ "node", "index.js" ]
