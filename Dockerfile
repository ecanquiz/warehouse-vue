FROM node:23.6.0 AS build
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.27.3
COPY --from=build /app/dist /opt/site
COPY nginx.conf /etc/nginx/nginx.conf
