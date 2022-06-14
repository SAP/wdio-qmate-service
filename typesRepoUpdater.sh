#!/bin/bash

# Remove existing tmp dir
rm -rf ./typesTmp

# Create tmp dir
mkdir ./typesTmp

# Copy all declaration files to tmp dir
find ./lib -name "*.d.ts" | xargs cp -b --parents -t ./typesTmp

# Copy all files from @types to the root of tmp dir
cp ./@types/* ./typesTmp

# Remove @types layer to the root of tmp dir
find ./typesTmp -name "*.d.ts" -exec sed -i 's/@types\/wdio/wdio/g' {} +

