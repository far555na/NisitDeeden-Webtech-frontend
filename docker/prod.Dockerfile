# Stage 1: Build
FROM node:20-alpine AS builder

ARG VITE_API_URL
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_GOOGLE_OAUTH_CALLBACK_URL

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_GOOGLE_CLIENT_ID=${VITE_GOOGLE_CLIENT_ID}
ENV VITE_GOOGLE_OAUTH_CALLBACK_URL=${VITE_GOOGLE_OAUTH_CALLBACK_URL}

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm prune --production

# Stage 2: Run
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "build/index.js"]