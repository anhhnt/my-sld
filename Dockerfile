FROM node:8-alpine

RUN mkdir /my-sld

COPY . /my-sld/

RUN cd /my-sld/ && yarn install && pwd && ls -la

RUN cd /my-sld/react/ && yarn install && pwd && ls -la

EXPOSE 3030 443
