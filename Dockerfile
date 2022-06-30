FROM node:16
WORKDIR /home/www/clean-code-api
COPY ./package.json .
RUN npm install --omit=dev
