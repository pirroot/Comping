FROM node:24-alpine

WORKDIR /app

RUN npm install -g pnpm@12.4.2 --allow-scripts=pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
