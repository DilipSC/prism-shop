FROM node:20-alpine
WORKDIR /app
COPY package.json server.js products.json ./
RUN npm ci --omit=dev
COPY public ./public
EXPOSE 3000
USER node
CMD ["node", "server.js"]
