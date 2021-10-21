library 'fiori.s4.jenkins.library@qmate'
library 'piper-lib-os'
def jenkinsNode = 'dlms4hana'
echo "jenkinsNode ${jenkinsNode}"
node (jenkinsNode) {
  timestamps {   
    def build_ok = true
    env.JENKINS_NODE_NAME = jenkinsNode
    env.fioriNotInstall = true
    wdioQmateServiceReusePr()
    wdioQmateServiceCorePr()
    wdioQmateServiceAuthenticatorPr()
    if (build_ok) {
      currentBuild.result = "SUCCESS"
    } else {
      currentBuild.result = "FAILURE"
    }
  }
}


