#!/bin/bash

# Create the destination directory structure
mkdir -p docker_build/apps
mkdir -p docker_build/packages
mkdir -p docker_build/tooling

# Copy package.json files maintaining the directory structure
for d in apps packages tooling; do
    for subdir in $(find $d -type d); do
        if [ -f "$subdir/package.json" ]; then
            mkdir -p "docker_build/$subdir"
            cp "$subdir/package.json" "docker_build/$subdir"
        fi
    done
done
