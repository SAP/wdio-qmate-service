cd ./tests

echo "List test folders"
echo
for d in */ ; do
    echo "$d"
done
for d in */ ; do
    echo
    echo "$d" " test folder"
    cd $d

    echo "1 Install dependencies and devDependencies"
    npm i

    IS_CHROMEDRIVER_UPDATE_REQUIRED="grep 'chromedriver-update' package.json"

    if [[ $IS_CHROMEDRIVER_UPDATE_REQUIRED ]]
    then
      echo "1.1 Run chromedriver-update script"
      npm run chromedriver-update
    fi

    echo "2. Run tests"
    npm run test

done