FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# 7. 실행 환경 설정
ENV NODE_ENV=production

# 8. Next.js 앱 실행
CMD ["npm", "start"]
