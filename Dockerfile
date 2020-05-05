FROM node:14.1.0-alpine3.11 as builder

WORKDIR /app

COPY package.json /app/

#COPY angular.json package.json tsconfig.json tslint.json package-lock.json /app/
RUN npm install @angular/cli@7.0.3 -g

RUN npm install

COPY . .

RUN npm run build --prod

# Build a small nginx image with static website
FROM nginx:1.18.0-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/beeweb-ui/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

#WORKDIR /app
#COPY entrypoint.sh /app/.

EXPOSE 80

#ENTRYPOINT [ "sh", "/app/entrypoint.sh" ]
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
