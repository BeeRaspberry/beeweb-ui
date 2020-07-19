FROM node:14.1.0-alpine3.11 as builder

WORKDIR /app

COPY package.json /app/

RUN npm install @angular/cli@10.0.3 -g

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:1.18.0-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/beeweb-ui/ /usr/share/nginx/html
COPY ./nginx-template.conf ./nginx-template.conf
COPY entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

CMD ["/bin/sh",  "-c",  "./entrypoint.sh && exec nginx -g 'daemon off;'"]
