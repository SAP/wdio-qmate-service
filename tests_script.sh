cd ./tests
echo "1. set environment variables for chromedriver"
export CHROMEDRIVER_PORT=4444
export DBUS_SESSION_BUS_ADDRESS=/dev/null
export OPENSSL_BIN='/usr/bin/openssl'
echo "List test folders"
echo
for d in */ ; do
  echo "$d"
done
for d in */ ; do
  echo
  echo "$d" " test folder"
  cd $d

  echo "2. Install dependencies and devDependencies"
  npm i
  
  echo "3. Run tests"
  npm run test

done