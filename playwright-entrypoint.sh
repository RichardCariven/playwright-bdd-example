#!/bin/bash

# curl $BASE_URL once every 5 seconds until the server to be up or time out
wait_for_url() {
  local retries=15
  local wait=5
  local url=$1
  local i=0
  while [ $i -lt $retries ]; do
    i=$((i + 1))
    echo "Checking if $url is up. Attempt $i of $retries..."
    if curl -s -f $url; then
      echo "$url is up!"
      return 0
    fi
    sleep $wait
  done
  echo "Timed out waiting for $url"
  return 1
}

# Set a default browser name if none is provided
BROWSER_NAME=${BROWSER_NAME:-chromium}

# Wait and then run passed command
wait_for_url $BASE_URL && $@
