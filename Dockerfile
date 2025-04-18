# 1단계: 빌드 스테이지
FROM --platform=linux/arm64 node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# 2단계: 실행 전용 스테이지
FROM --platform=linux/arm64 node:18-alpine AS runner

WORKDIR /app

# production 환경 변수
ENV NODE_ENV=production

# 빌드된 결과물과 필요한 파일만 복사
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# prod 의존성만 설치
RUN npm ci --omit=dev

# 실행
CMD ["npm", "start"]
