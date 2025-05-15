# Troubleshooting
If you find any bug or issue which is not listed below, please open a new [issue](https://github.com/SAP/wdio-qmate-service/issues){target="__blank"} in the qmate repository. Thanks for your support.


## SessionNotCreatedError
???+ bug "Error Message"
    ``Error: SessionNotCreatedError: session not created: This version of ChromeDriver only supports Chrome version 89 Current browser version is 91.0.4472.77 with binary path C:\Program Files (x86)\Google\Chrome\Application\chrome.exe``

??? warning "Possible Reasons"
    The installed chromedriver does not support the current chrome-browser version or vice versa.

??? check "Possible Solutions"
    - Please update your chromedriver version.  
    - Also update your Chrome Browser version by visiting [About Google Chrome](chrome://settings/help). This will automatically trigger the Chrome Browser update. You will have to restart Chrome after the update is completed.


