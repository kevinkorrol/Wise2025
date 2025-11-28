FROM node:20

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN pnpm install

# Copy source code
COPY . .

# Expose Vite dev server
EXPOSE 5173

# Start Vite dev server
CMD ["pnpm", "run", "dev", "--", "--host"]
