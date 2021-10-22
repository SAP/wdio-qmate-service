# Troubleshooting
If you find any bug or issue which is not listed below, please [Contact](./contact.md) us 
or open a new [Issue](https://github.tools.sap/sProcurement/qmate/issues) in the qmate repository. Thanks for your support!

## GitHub Authentication
If you are not able to access GitHub normally (clone, pull, push, etc.), this can have multiple reasons.

### Permission
Check if you have the permission to push to the specific repository or branch. 
If you want to contribute to the Qmate project, please find the [Contribution](./contribution.md) section. If you want to contribute to a different project, please contact an administrator of this repository and ask him to add you as an contributor if not yet done.

### SSO Enablement
Since the login with username and password is not available any more in GitHub Enterprise, you need to generate and setup your personal **access token** to authenticate. Find more information under [SSO Enablement for GitHub.wdf.sap.corp](https://github.wdf.sap.corp/pages/github/sso-enablement). The easiest way to setup the toke is by using Visual Studio Code.

#### Error log: 
```bash
TODO
```

#### Solution:
 
- **Step 1:** Generate you [Personal access token](https://github.tools.sap/settings/tokens) and save it at a secure place.

- **Step 2:** Open Visual Studio Code and install the [GitHub Extension](https://marketplace.visualstudio.com/items?itemName=KnisterPeter.vscode-github).

- **Step 3:** Open the **Command Palette** in Visual Studio Code by pressing <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>.

- **Step 4:** Type in the following command and confirm with <kbd>Enter</kbd>.
```
GitHub Personal Acces Token
```

- **Step 5:** Define the *GitHub Enterprise Hostname* and confirm with <kbd>Enter</kbd>.
```
github.wdf.sap.corp
```

- **Step 6:** Copy and paste your generated **token** inside the field. Confirm with <kbd>Enter</kbd>.

- **Step 7:** You should be able to use GitHub normally.

> 🛈 Note that you have to use your token as password along with your GitHub username.

