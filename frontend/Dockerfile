FROM node:18-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY . .
RUN pnpm install --prod
RUN pnpm build
CMD ["pnpm", "start"]
