# Build stage
FROM node:latest AS build

WORKDIR /build

# Copy package.json and all configuration files first
COPY package.json ./
# COPY index.html ./

# Install dependencies
RUN npm install --verbose --force

# Copy all source files including assets
COPY public/ public/
COPY src/ src/

# Build the app
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine

# Remove default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Create new nginx configuration
RUN echo $'\
server { \n\
    listen 80 default_server; \n\
    listen [::]:80 default_server; \n\
    \n\
    server_name _; \n\
    \n\
    root /usr/share/nginx/html; \n\
    index index.html; \n\
    \n\
    # Enable compression \n\
    gzip on; \n\
    gzip_min_length 1000; \n\
    gzip_proxied expired no-cache no-store private auth; \n\
    gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript; \n\
    \n\
    location / { \n\
        try_files $uri $uri/ /index.html; \n\
    } \n\
    \n\
    # Cache static assets \n\
    location /assets/ { \n\
        expires 1y; \n\
        add_header Cache-Control "public, no-transform"; \n\
    } \n\
    \n\
    # Error pages \n\
    error_page 404 /index.html; \n\
    error_page 500 502 503 504 /50x.html; \n\
    location = /50x.html { \n\
        root /usr/share/nginx/html; \n\
    } \n\
} \n\
' > /etc/nginx/conf.d/default.conf

# Copy built assets to Nginx serve directory
COPY --from=build /build/dist /usr/share/nginx/html

# Make sure files are owned by nginx user
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
