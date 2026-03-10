FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


ARG API_URL
ENV API_URL=$API_URL

EXPOSE 3000
CMD ["npm", "run", "preview"]