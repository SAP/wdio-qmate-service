echo "1. Run 'npm ci' in root folder"
npm ci
echo ''
echo "2. set environment variables for chromedriver"
export CHROMEDRIVER_PORT=4444
export DBUS_SESSION_BUS_ADDRESS=/dev/null
export OPENSSL_BIN='/usr/bin/openssl'
echo "List test folders"
echo ''
cd ./tests

echo "List test folders"
echo
for d in */ ; do
  if [[ $d != "helper/" ]]
  then
    echo "$d"
  fi
done
for d in */ ; do
    if [[ $d != "helper/" ]]
    then
      echo
      echo "$d" " test folder"
      cd $d

      echo "Run tests"
      npm run test
    fi
done