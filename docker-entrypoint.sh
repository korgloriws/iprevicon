#!/bin/sh
set -e

# Garante permissão no volume SQLite + uploads
mkdir -p /app/data/uploads/transparency /app/data/uploads/legislation /app/data/uploads/news
chown -R nextjs:nodejs /app/data

exec su-exec nextjs "$@"
