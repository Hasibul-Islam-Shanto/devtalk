def call() {
    withCredentials([
        string(credentialsId: 'devtalk-jwt-secret', variable: 'JWT_SECRET'),
    ]) {
        sh 'docker compose build'
    }
}
