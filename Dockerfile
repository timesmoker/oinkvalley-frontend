FROM node:18-alpine

WORKDIR /app

COPY .next/ .next/
COPY public/ public/
COPY package.json ./
COPY node_modules/ node_modules/

CMD ["npm", "start"]