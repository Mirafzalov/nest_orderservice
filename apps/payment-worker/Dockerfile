FROM node:24.18.0


WORKDIR /app


COPY package.json package-lock.json ./


COPY . .


RUN npm isntall



CMD ["npx", "nest", "start", "payment-worker", "--watch"]