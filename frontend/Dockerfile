# Step 1: Build the application
FROM node:22.13.1 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build  # Adjust this if your build command is different

# Step 2: Serve the application
FROM nginx:alpine

# Copy the Next.js output to the Nginx HTML directory
COPY --from=build /app/.next /usr/share/nginx/html

# Expose the port that Nginx will run on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
