# Use official Node image (small, secure)
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package manifests first and install (cache layer)
COPY package*.json ./

# Install only production deps for runtime
RUN npm ci --only=production

# Copy source
COPY . .

# Expose port (match app.js)
EXPOSE 3000

# Use a non-root user (optional, better security)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Start
CMD ["node", "app.js"]
