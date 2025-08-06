FROM node:20.18-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm@latest
RUN pnpm install
COPY . .
RUN pnpm run build
FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
