# Step 1: Build the React app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (if it exists)
COPY package*.json ./

# Install dependencies
RUN npm install --force
RUN npm install @mui/material @mui/utils @mui/system @mui/icons-material --force

# Copy the entire project to the container
COPY . .

# Build the React app for production
RUN npm run build

# Step 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy the build folder from the build stage to the Nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Create nginx configuration for SPA
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose the port on which the app will run
EXPOSE 80

# Start Nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]