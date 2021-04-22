FROM node:alpine as todo-app-build

WORKDIR /client

COPY package.json yarn.lock README.md ./

RUN yarn

COPY ./public ./public

COPY ./src ./src

ENV REACT_APP_baseAPIURL=http://20.195.33.143:30505

RUN yarn build

FROM nginx:latest

LABEL maintainer=faiza

COPY --from=todo-app-build /client/build/ /usr/share/nginx/html

EXPOSE 80
