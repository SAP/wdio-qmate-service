library 'fiori.s4.jenkins.library@qmate'
library 'piper-lib-os'
def jenkinsNode = 'dlms4hana'
echo "jenkinsNode ${jenkinsNode}"
node (jenkinsNode) {
  timestamps {   
    env.JENKINS_NODE_NAME = jenkinsNode
    env.fioriNotInstall = true
    wdioQmateServiceReusePr()
    wdioQmateServiceCorePr()
    wdioQmateServiceAuthenticatorPr()
  }
}


