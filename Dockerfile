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

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]

#CMD ["nginx", "-g", "daemon off;"]
