FROM node:8-alpine

RUN mkdir /my-sld

COPY . /my-sld/

RUN cd /my-sld/ && ls -la && yarn install && pwd && ls -la

RUN cd /my-sld/react/ && ls -la && yarn install && export NODE_ENV=production && yarn build && pwd && ls -la

EXPOSE 3030 443

CMD cd /my-sld/
CMD npm start
