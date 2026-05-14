# syntax=docker/dockerfile:1.7

# --- Build stage ---
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps first for better layer caching
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy source and build static export
COPY . .
RUN npm run build

# --- Runtime stage: nginx serving static files ---
FROM nginx:1.27-alpine AS runtime
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
