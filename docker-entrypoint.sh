#!/bin/bash
set -e

echo "*****"
echo "** idees3D Application preparing to start up... Hi!"
echo "** Local time         :$(date -Is)"
echo "** SERVICE_NAME       :${SERVICE_NAME}"
echo "*****"

if [ -d "/app" ]
then
  pushd /app

  if [ "$DATABASE_MIGRATION" = "ENABLE" ]
  then
    echo "+Running Drizzle database migrations - disable with .env entry DATABASE_MIGRATION=DISABLE"
    npm run db:migrate
    echo "+Database migrations completed successfully"
  else
    echo "+Skipping database migrations - enable with .env entry DATABASE_MIGRATION=ENABLE"
  fi

  if [ "$DATABASE_GENERATE" = "SEED" ]
  then
    echo "+Running Drizzle schema generation - disable with DATABASE_GENERATE .env entry =DISABLE"
    bun db:generate
    echo "+Database schema generation completed successfully"
  else
    echo "+Skipping database schema generation - enable with .env entry DATABASE_GENERATE=ENABLE"
  fi

  echo "+Database setup completed. Starting application..."
  popd
fi

if [ "${1#-}" != "${1}" ] || [ -z "$(command -v "${1}")" ]
then
  set -- node "$@"
fi

exec "$@"
