# 1. Use Node.js 18
FROM node:18-alpine AS build

WORKDIR /app

# 2. Copy package files & install deps
COPY package*.json ./
RUN npm install

# 3. Copy all source
COPY . .

# 4. Build the Vite app for production
RUN npm run build

# 5. Install serve globally to serve the build
RUN npm install -g serve

# 6. Expose the port (4173 is our "preview" port)
EXPOSE 4173

# 7. Default command to serve the build folder
CMD ["serve", "-s", "dist", "-l", "4173"]
