# syntax=docker/dockerfile:1
   
FROM node:18-alpine

WORKDIR /app

COPY . .

RUN apk add --no-cache bash git openssh



RUN apk --no-cache add openssl
RUN apk add ca-certificates wget && \
    update-ca-certificates

ENV OPENSSL_CONF=/etc/ssl/

ENV NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt


RUN npm install -g babel-cli

RUN yarn install



CMD ["npm", "start"]

EXPOSE 3000