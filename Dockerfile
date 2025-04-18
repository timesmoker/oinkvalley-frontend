# 1단계: 빌드 스테이지
FROM --platform=linux/arm64 node:18-alpine AS builder

WORKDIR /app

COPY .next/ .next/
COPY public/ public/
COPY package.json ./
COPY node_modules/ node_modules/


