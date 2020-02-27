FROM node:erbium-alpine
RUN mkdir -p /src/app
WORKDIR /src/app
COPY . .
RUN apk update \
  && apk add --no-cache --virtual .build-deps alpine-sdk python \
  && npm install \
  && apk del .build-deps
EXPOSE 80

CMD [ "sh", "-c", "npm run build && npm start" ]