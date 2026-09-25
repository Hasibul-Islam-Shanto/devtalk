def call() {
    def scannerHome = tool 'Sonar'
    withSonarQubeEnv('Sonar') {
        sh "${scannerHome}/bin/sonar-scanner"
    }
}
