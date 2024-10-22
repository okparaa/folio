# Base image for both development and production
FROM node:18-alpine AS base
WORKDIR /api
EXPOSE 3000

# Install dependencies
COPY package*.json ./

# Only install production dependencies for the production build
FROM base AS production

RUN addgroup bee && adduser -S -G bee bee

RUN --mount=type=cache,target=/bee/.npm npm install 

RUN --mount=type=cache,target=/bee/.npm npm install typescript -g 

# Copy source code to the app directory
COPY --chown=bee:bee . .

RUN tsc && npx drizzle-kit generate && chmod +x prod.start.sh

RUN chown -R bee: dist && chown -R bee: drizzle

USER bee

# Run the application in production
ENTRYPOINT [ "/api/prod.start.sh" ]


# Install development dependencies and tools for dev builds
FROM base AS development

RUN --mount=type=cache,target=/node/.npm npm install

# Copy the entire source code for development
COPY --chown=node:node . .

# Install Drizzle client and other dev dependencies
RUN npx drizzle-kit generate && chmod +x dev.start.sh

USER node

# Default command for development
ENTRYPOINT [ "/api/dev.start.sh" ]
