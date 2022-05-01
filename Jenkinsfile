library 'piper-lib-os'
library 'piper-lib'

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
    node() {
        timestamps {
          try{
            dockerExecute(script: this,
                          dockerImage: 'qmate.int.repositories.cloud.sap/qmate-executor:latest',
                          verbose: true) {

              checkout scm

              sh '''
                  npm config set registry http://nexus.wdf.sap.corp:8081/nexus/content/groups/build.milestones.npm/
                  npm config set @SAP:registry http://nexus.wdf.sap.corp:8081/nexus/content/groups/build.milestones.npm/
                  npm i
                  npm run build
                  '''

            withCredentials([sshUserPrivateKey(credentialsId: 'qmate-privatekey', keyFileVariable: 'QMATE_PRIVATE_KEY_FILE')]) {
                //ugly hacky hack to load private key to env variable, otherwise has problems with \n chars
                def key = readFile(QMATE_PRIVATE_KEY_FILE)
                withEnv(["QMATE_PRIVATE_KEY=${key}"]) {
                    sh "CHROME_DRIVER=/usr/bin/chromedriver npm run test:${test.area}:${test.name}"
                }
              }
           }
            
          } catch (err) {
            archiveArtifacts artifacts: "**/tests/${test.area}/${test.name}/results/**", allowEmptyArchive : true
                          error 'Pipeline failed!\n' + err.message
          } finally {
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: true,
                reportDir: 'results',
                reportFiles: 'report.html',
                reportName: "E2E Qmate Tests ${test.area} ${test.name}",
                reportTitles: ''
            ])
          }
        }
    }
  }
}

parallel closureBuilder



