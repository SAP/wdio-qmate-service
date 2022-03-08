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
          try {
            checkout scm

            sh '''
                python --version
                node --version
                '''

            sh '''
                npm config set registry http://nexus.wdf.sap.corp:8081/nexus/content/groups/build.milestones.npm/
                npm config set @SAP:registry http://nexus.wdf.sap.corp:8081/nexus/content/groups/build.milestones.npm/
                npm i
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
node(jenkinsNode) {
    stage('Run tests') {
      parallel closureBuilder
    }
    stage('Update Docs') {
        when {
          not {
            environment name: 'ghprbActualCommitAuthorEmail', value: 'qmate.jenkins@sap.com'
          }
        }
        steps {
            sshagent(['codepipes-github']) {
              sh '''
              httpUrl=$ghprbAuthorRepoGitUrl
              find='https://github.tools.sap/'
              replace='git@github.tools.sap:'
              sshUrl=${httpUrl//$find/$replace}
              if [[ $sshUrl != 'git@github.tools.sap:sProcurement/wdio-qmate-service.git' ]]; then
                cd ..
                git clone $sshUrl CLONE_FORK_REPO
                cd CLONE_FORK_REPO
              fi
              git remote set-url origin $sshUrl
              git fetch origin
              git config user.email "qmate.jenkins@sap.com"
              git config user.name "Qmate Jenkins"
              git checkout $ghprbSourceBranch
              npm install
              npm run generate-docs
              changes=$(git diff)
              if [[ $changes != '' ]]; then
                git commit -am "Update documentation"
                git push origin $ghprbSourceBranch
              fi
              '''
            }
        }
    }
}

// parallel closureBuilder

