FROM node:18.4.0-alpine

WORKDIR /api

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --frozen-lockfile

COPY . .

# RUN ln -sf /dev/stdout /logs/debug.log

EXPOSE 8080

CMD [ "yarn", "start:docker" ]
