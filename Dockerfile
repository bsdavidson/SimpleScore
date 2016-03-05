FROM gliderlabs/alpine

ENV DB_NAME=simplescore \
    PORT=8080
EXPOSE $PORT

RUN apk-install nodejs

COPY package.json /opt/simplescore/package.json
WORKDIR /opt/simplescore
RUN npm install
COPY . /opt/simplescore
VOLUME /opt/simplescore

CMD ["npm", "start"]
