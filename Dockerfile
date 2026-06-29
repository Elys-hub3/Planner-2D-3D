FROM node:22 AS base

FROM base AS deps

WORKDIR /app

COPY package.json package-lock.json* /app/

RUN npm install


FROM base AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build


FROM base AS production
WORKDIR /app

COPY ./docker-entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh


RUN adduser --system --uid 1001 nextjs

# Copy drizzle config and dependencies for migrations
COPY --from=builder /app/drizzle.config.ts ./
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/node_modules ./node_modules

RUN mkdir .next
RUN chown nextjs:node .next
COPY --from=builder --chown=nextjs:node /app/.next/standalone ./
COPY --from=builder --chown=nextjs:node /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:node /app/public ./public
USER nextjs

EXPOSE 3005

ENTRYPOINT ["/entrypoint.sh"]

ENV HOSTNAME=0.0.0.0
ENV PORT=3005
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV DATABASE_MIGRATION=ENABLE
ENV DATABASE_GENERATE=ENABLE
ENV SERVICE_NAME="IDEES3D APP"

CMD ["node", "server.js"]
