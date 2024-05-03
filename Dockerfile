FROM node:18.20.2-buster as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY . ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Define a build argument with a default value of "development"
ARG ENVIRONMENT

# If the ENVIRONMENT argument is set to "production", run npm run build:prod, otherwise run npm run build
RUN if [ "$ENVIRONMENT" = "production" ]; then \
        npm run build:prod; \
    else \
        npm run build; \
    fi

# Use Nginx as the production server
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]