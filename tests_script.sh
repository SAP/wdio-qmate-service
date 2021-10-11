echo "1. Run 'npm ci' in root folder"
npm ci
echo ''
echo "2. set environment variables for chromedriver"
export CHROMEDRIVER_PORT=4444
export CHROMEDRIVER_FILEPATH=/usr/bin/chromedriver
echo "Run tests"

wdio tests/reuse/nonUi5/assertion/test.assertion.conf.js