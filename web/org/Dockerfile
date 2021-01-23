FROM node:10.16.3-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn && \
    yarn telemetry_disable && \
    yarn cache clean && \
    yarn fetch-pkg
COPY . .
CMD ["yarn", "dev"]