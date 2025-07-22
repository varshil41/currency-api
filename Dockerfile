# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Run
FROM node:20-alpine

WORKDIR /app

# Copy package.json to allow npm commands in runtime
COPY package*.json ./

# Copy built output and installed deps
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# ✅ Make sure dev script exists (or change it to `node dist/index.js`)
CMD ["npm", "run", "dev"]
