# Stage 1: Build the application
FROM node:22-alpine AS build-stage


ARG VITE_AUTH_ROOT_URL="http://localhost:20000"
ENV VITE_AUTH_ROOT_URL=$VITE_AUTH_ROOT_URL
ARG VITE_API_ROOT_URL="http://localhost:20005"
ENV VITE_API_ROOT_URL=$VITE_API_ROOT_URL
ARG VITE_MANAGEMENT_ROOT_URL="http://localhost:20004"
ENV VITE_MANAGEMENT_ROOT_URL=$VITE_MANAGEMENT_ROOT_URL
ARG VITE_AI_AGENT_URL="http://localhost:20004"
ENV VITE_AI_AGENT_URL=$VITE_AI_AGENT_URL
ARG VITE_MEDIA_SERVICE_ROOT="http://localhost:20004"
ENV VITE_MEDIA_SERVICE_ROOT=$VITE_MEDIA_SERVICE_ROOT

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./
# If you're using Yarn, copy yarn.lock instead
# COPY yarn.lock ./

# Install dependencies
RUN npm install
# If you're using Yarn
# RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
CMD npm run dev -- --host
