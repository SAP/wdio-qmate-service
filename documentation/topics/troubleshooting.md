# Troubleshooting

1. If you face such error `command not found: wdio`, remove your package-lock.json, run `npm cache clean --force` and run `npm install`.
   We moved `@wdio/cli` from `dependencies` to `devDependencies`, so you  just to refresh your local dependencies and cache.
   
2. Please, use `npx wdio <config file>` instead of `wdio <config file>`.

If you see an error 
```
'wdio' is not recognized as an internal or external command,
operable program or batch file.
```
it means you try to use `wdio` as a command to execute tests suite.

3. It is not required to run `npm i` in root package, if you want to run tests ß there is no dependencies in wdio-qmate-service (only devDependencies)