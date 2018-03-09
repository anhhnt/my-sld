FROM node:8-alpine

CMD "mkdir /my-sld"

COPY * /my-sld/

CMD "cd /my-sld/ && yarn install && yarn start"
