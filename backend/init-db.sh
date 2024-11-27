#!/bin/bash

# Wait for the database to be ready
until PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c '\l'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

# Create the tasks table if it doesn't exist
PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c "
  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    priority VARCHAR(50),
    status VARCHAR(50)
  );
"

# Start the server
node server.js
