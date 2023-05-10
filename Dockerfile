FROM node:alpine
WORKDIR /usr/src/app/devenv
COPY package*.json .
RUN npm ci
COPY . .
CMD [ "npm","start" ]





