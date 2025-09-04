FROM node:20-slim

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json .
RUN npm install

# ✅ Ensure the correct @swc/core platform binary is present
RUN arch="$(node -p "process.arch")"; \
  if [ "$arch" = "arm64" ]; then \
    npm i @swc/core-linux-arm64-gnu --no-save; \
  else \
    npm i @swc/core-linux-x64-gnu --no-save; \
  fi

COPY src ./src

ENV TEMPORAL_ADDRESS=host.docker.internal:7233
EXPOSE 9464

CMD ["npm", "run", "start"]
