FROM node:10.16.3-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean
COPY . .
CMD ["yarn", "start"]