# Stage 1: Build the React app
FROM node:22 AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy app files and build
COPY . .
RUN npm run build

# Stage 2: Serve the built app using Node.js
FROM node:18

# Set working directory
WORKDIR /app

# Copy build files from the builder stage
COPY --from=builder /app/dist ./dist

# RUN npm config set registry https://registry.npmjs.org/

# RUN npm config set registry https://registry.yarnpkg.com/ 
RUN npm install -g serve@14.2.4 --verbose

# Expose the port
EXPOSE 4002

# Start the application
CMD ["serve", "-s", "dist/bundle", "-l", "4002"]