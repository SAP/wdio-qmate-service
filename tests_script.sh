echo "Run 'npm ci' in root folder"
npm ci
echo ''
echo "Run 'npm run chromedriver-upgrade' in root folder"
npm run chromedriver-upgrade
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