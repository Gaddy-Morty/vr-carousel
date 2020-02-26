FROM node:erbium-alpine
RUN apk update && apk add --no-cache bash
RUN mkdir -p /src/app
WORKDIR /src/app
COPY . .
RUN npm install
EXPOSE 80

CMD [ "sh", "-c", "npm run build && npm start" ]