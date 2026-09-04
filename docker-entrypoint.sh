#!/bin/sh
set -e

# Garante permissão no volume SQLite montado da VPS
mkdir -p /app/data
chown -R nextjs:nodejs /app/data

exec su-exec nextjs "$@"
