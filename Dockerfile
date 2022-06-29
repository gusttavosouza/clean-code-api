FROM node:16
WORKDIR /usr/src/clean-code-api
COPY ./packaage.json ./
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 5000
CMD npm start