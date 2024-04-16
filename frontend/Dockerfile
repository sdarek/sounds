# Stage 1: Set up the development environment
FROM node:20.9.0-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package.json package-lock.json ./

# Install Angular CLI globally and project dependencies
RUN npm install -g @angular/cli && npm install

# Copy the project files into the docker container
COPY . .

# Expose the port the app runs on
EXPOSE 4200

# Start the application
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "200"]
