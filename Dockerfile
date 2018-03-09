FROM node:8-alpine

RUN mkdir /my-sld

COPY . /my-sld/

RUN cd /my-sld/ && yarn install && pwd && ls

EXPOSE 3030 443
