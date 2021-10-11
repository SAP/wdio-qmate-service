echo "1. Run 'npm i' in root folder"
npm i
echo ''
echo "2. set environment variables for chromedriver"
export CHROMEDRIVER_PORT=4444
export CHROMEDRIVER_FILEPATH=/usr/bin/chromedriver
echo "Run tests"
node -v
npm -v
npm i npx
npx wdio ./tests/reuse/nonUi5/assertion/test.assertion.conf.js