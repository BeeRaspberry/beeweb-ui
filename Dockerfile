FROM node:14.14.0-alpine3.12 as builder

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/

RUN npm install @angular/cli@10.2.0 -g

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:1.19.3-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/beeweb-ui/ /usr/share/nginx/html
COPY default.conf.template /etc/nginx/templates/default.conf.template

CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]
