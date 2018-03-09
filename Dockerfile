FROM node:8-alpine

RUN mkdir /my-sld

COPY * /my-sld/

RUN cd /my-sld/ && yarn install && pwd && ls

CMD [ "cd", "/my-sld" ]
CMD [ "yarn", "start" ]
