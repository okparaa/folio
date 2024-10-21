# Base image for both development and production
FROM node:18-alpine AS base
WORKDIR /api
EXPOSE 3000

# Install dependencies
COPY package*.json ./

# Only install production dependencies for the production build
FROM base AS production

# Copy source code to the app directory
COPY . .

RUN npm install && \
    npm install typescript -g && \
    tsc && \
    npx drizzle-kit generate && chmod +x prod.start.sh

# Run the application in production
ENTRYPOINT [ "/api/prod.start.sh" ]

# Install development dependencies and tools for dev builds
FROM base AS development

# Copy the entire source code for development
COPY . .

RUN npm install

# Install Drizzle client and other dev dependencies
RUN npx drizzle-kit generate && chmod +x dev.start.sh

# Default command for development
ENTRYPOINT [ "/api/dev.start.sh" ]
