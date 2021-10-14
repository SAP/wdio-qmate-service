library 'fiori.s4.jenkins.library@qmate'
library 'piper-lib-os'
wdioQmateServicePr(publishResultReport)
def jenkinsNode = 'dlms4hana'
echo "jenkinsNode ${jenkinsNode}"
node (jenkinsNode) {
  timestamps {   
    env.fioriNotInstall = true
    wdioQmateServicePr()
  }
}