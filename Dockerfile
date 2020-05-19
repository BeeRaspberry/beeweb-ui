FROM node:14.1.0-alpine3.11 as builder

WORKDIR /app

COPY package.json /app/

#COPY angular.json package.json tsconfig.json tslint.json package-lock.json /app/
RUN npm install @angular/cli@9.1.4 -g

RUN npm install

COPY . .

RUN npm run build --prod

# Build a small nginx image with static website
FROM nginx:1.18.0-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/beeweb-ui/ /usr/share/nginx/html
COPY ./nginx-template.conf ./nginx-template.conf
#COPY ./nginx.conf /etc/nginx/conf.d/default.conf
#WORKDIR /app
COPY entrypoint.sh ./entrypoint.sh

EXPOSE 80

#ENTRYPOINT [ "sh", "/app/entrypoint.sh" ]
CMD ["/bin/sh",  "-c",  "./entrypoint.sh && exec nginx -g 'daemon off;'"]

#CMD ["/bin/sh",  "-c",  "export API_URL='${API_URL}'; envsubst '$API_URL' < ./nginx-template.conf > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]