FROM node:24.18.0


WORKDIR /app


COPY package.json package-lock.json ./


COPY . .


RUN npm install



EXPOSE 3000


CMD ["npx", "nest", "start", "order_service", "--watch"]


