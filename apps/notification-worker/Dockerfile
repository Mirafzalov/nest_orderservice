FROM node:24.18.0


WORKDIR /app


COPY package.json ./


COPY . .


RUN npm install


CMD ["npx", "nest", "start", "notification-worker", "--watch"]



