# Step 1: Build the application (Build Stage)
FROM node:22.13.1 AS build

# --- MODIFIED USER SETUP: Remove explicit GID/UID to avoid conflicts ---
# Create a dedicated group and user for the application.
# Let addgroup/adduser assign available system GID/UIDs.
# Set the home directory explicitly to /home/appuser.
RUN addgroup --system appgroup \
    && adduser --system --ingroup appgroup --home /home/appuser --disabled-password appuser

# Create the user's home directory and set ownership.
RUN mkdir -p /home/appuser && chown -R appuser:appgroup /home/appuser

# Create the application directory inside the user's home and set its ownership.
RUN mkdir -p /home/appuser/app && chown -R appuser:appgroup /home/appuser/app

# Set the working directory to the appuser's app directory.
WORKDIR /home/appuser/app

# Force npm's cache and other directories into the user's explicit home/app directory
RUN mkdir -p /home/appuser/app/.npm \
           /home/appuser/app/.npm-tmp \
           /home/appuser/app/.npm-logs \
    && chown -R appuser:appgroup /home/appuser/app/.npm \
                               /home/appuser/app/.npm-tmp \
                               /home/appuser/app/.npm-logs

# Directly create a .npmrc file for the appuser with the desired settings.
RUN echo "cache=/home/appuser/app/.npm" > .npmrc \
    && echo "tmp=/home/appuser/app/.npm-tmp" >> .npmrc \
    && echo "logs-dir=/home/appuser/app/.npm-logs" >> .npmrc \
    && chown appuser:appgroup .npmrc

# Switch to the non-root user. All subsequent commands will run as appuser.
USER appuser

# Copy package.json and package-lock.json from the build context.
COPY package*.json ./

# Install dependencies.
RUN npm install --prefix .

# Copy the rest of the application code.
COPY . .

# Build the Next.js application for production
RUN npm run build

# Step 2: Serve the application (Runtime Stage)
FROM node:22.13.1-slim

# Create the same non-root user and owned directory for the runtime stage.
# Again, remove explicit GID/UID here.
RUN addgroup --system appgroup \
    && adduser --system --ingroup appgroup --home /home/appuser --disabled-password appuser
RUN mkdir -p /home/appuser/app && chown -R appuser:appgroup /home/appuser/app
WORKDIR /home/appuser/app

# Copy only the necessary production files from the build stage, retaining ownership.
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