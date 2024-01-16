FROM node:latest
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install --production
RUN npm install --save-dev @types/react-copy-to-clipboard
COPY . .
RUN npm run build
ENV NODE_ENV=production
CMD [ "npm", "start" ]