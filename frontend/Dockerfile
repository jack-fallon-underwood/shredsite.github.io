# Step 1: Build the application (Build Stage)
FROM node:22.13.1 AS build

# Create a dedicated group and user for the application.
RUN addgroup --system appgroup \
    && adduser --system --ingroup appgroup --home /home/appuser --disabled-password appuser

# Create the user's home directory and the application directory, and set ownership.
# This ensures /home/appuser and /home/appuser/app are owned by appuser from the start.
RUN mkdir -p /home/appuser && chown -R appuser:appgroup /home/appuser
RUN mkdir -p /home/appuser/app && chown -R appuser:appgroup /home/appuser/app

# Set the working directory to the appuser's app directory.
WORKDIR /home/appuser/app

# Force npm's cache and other directories into the user's explicit home/app directory
# We'll put them directly in /home/appuser, which is the user's true home.
RUN mkdir -p /home/appuser/.npm \
           /home/appuser/.npm-tmp \
           /home/appuser/.npm-logs \
    && chown -R appuser:appgroup /home/appuser/.npm \
                               /home/appuser/.npm-tmp \
                               /home/appuser/.npm-logs

# Directly create a .npmrc file for the appuser with the desired settings in their home directory.
# This file will be automatically picked up by npm.
RUN echo "cache=/home/appuser/.npm" > /home/appuser/.npmrc \
    && echo "tmp=/home/appuser/.npm-tmp" >> /home/appuser/.npmrc \
    && echo "logs-dir=/home/appuser/.npm-logs" >> /home/appuser/.npmrc \
    && chown appuser:appgroup /home/appuser/.npmrc

# Switch to the non-root user. All subsequent commands will run as appuser.
USER appuser

# --- CRITICAL CHANGE HERE: Use --chown with COPY for package*.json ---
# Copy package.json and package-lock.json from the build context.
# Explicitly set ownership to appuser:appgroup *during the copy operation*.
# This guarantees that these files are owned by appuser before npm tries to modify them.
COPY --chown=appuser:appgroup package*.json ./

# Install dependencies.
# The --prefix . is still good practice to ensure local installation.
RUN npm install --prefix .

# Copy the rest of the application code.
# Also use --chown here for consistency.
COPY --chown=appuser:appgroup . .

# Build the Next.js application for production
RUN npm run build

# Step 2: Serve the application (Runtime Stage)
FROM node:22.13.1-slim

# Create the same non-root user and owned directory for the runtime stage.
RUN addgroup --system appgroup \
    && adduser --system --ingroup appgroup --home /home/appuser --disabled-password appuser
RUN mkdir -p /home/appuser/app && chown -R appuser:appgroup /home/appuser/app
WORKDIR /home/appuser/app

# Copy only the necessary production files from the build stage, retaining ownership.
# These already use --chown, which is correct.
COPY --from=build --chown=appuser:appgroup /home/appuser/app/.next ./.next
COPY --from=build --chown=appuser:appgroup /home/appuser/app/node_modules ./node_modules
COPY --from=build --chown=appuser:appgroup /home/appuser/app/public ./public
COPY --from=build --chown=appuser:appgroup /home/appuser/app/package.json ./package.json

# Switch to the non-root user for running the application
USER appuser

# Cloud Run requires your application to listen on PORT 8080.
ENV PORT 8080

# Expose the port your application will listen on.
EXPOSE 8080

# Command to start the Next.js production server.
CMD ["npm", "start"]