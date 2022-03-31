library 'piper-lib-os'
def jenkinsNode = 'dlms4hana'
echo "jenkinsNode ${jenkinsNode}"

def tests = [
    [ area:'reuse', name:'common'],
    [ area:'reuse', name:'ui5:pt1'],
    [ area:'reuse', name:'ui5:pt2'],
    [ area:'reuse', name:'nonUi5'],
    [ area:'reuse', name:'util'],
    [ area:'core', name:'functional'],
    [ area:'core', name:'testIntegration'],
    [ area:'core', name:'dataExchange'],
    [ area:'authenticator', name:'staticLogin']
]

def closureBuilder = [:]

tests.each { test ->

  closureBuilder["${test.area}:${test.name}"] = {
    node(jenkinsNode) {
        timestamps {
          try{
            checkout scm

            sh '''
                python --version
                node --version
                '''

            sh '''
                npm config set registry http://nexus.wdf.sap.corp:8081/nexus/content/groups/build.milestones.npm/
                npm config set @SAP:registry http://nexus.wdf.sap.corp:8081/nexus/content/groups/build.milestones.npm/
                npm i
                npm run build
                '''

            sh "CHROME_DRIVER=/usr/bin/chromedriver npm run test:${test.area}:${test.name}"
          } catch (err) {
            archiveArtifacts artifacts: "**/tests/${test.area}/${test.name}/results/**", allowEmptyArchive : true
                          error 'Pipeline failed!\n' + err.message
          } finally {
           //publishResultReport( 'reuse util - PR', 'wdio-qmate-service/tests/reuse/util' )
          }
        }
    }
  }
}

parallel closureBuilder
