# Use an official node image as a parent image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml before other files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --no-frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# Start the application
CMD ["pnpm", "start"]
