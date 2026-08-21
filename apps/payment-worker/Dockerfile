FROM node:24.18.0


WORKDIR /app


COPY package.json package-lock.json ./


RUN npm isntall


COPY . .

CMD ["npx", "nest", "start", "payment-worker", "--watch"]