#!/bin/bash

# Exit on error.
set -o errexit

yarn netlify:dev &
YARN_NETLIFY_PID=$!

yarn start --progress=false &
YARN_START_PID=$!

# Wait for app to start.
until curl http://localhost:4200 -o /dev/null 2>/dev/null
do
    sleep 1
done

# Wait for netlify functions to start.
until curl http://localhost:9000 -o /dev/null 2>/dev/null
do
    sleep 1
done

yarn cypress:run

kill "${YARN_NETLIFY_PID}"
kill "${YARN_START_PID}"
