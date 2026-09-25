def call() {
    sh 'trivy fs --exit-code 0 --format table -o trivy-fs-report.txt .'
    archiveArtifacts artifacts: 'trivy-fs-report.txt', allowEmptyArchive: true
}
