def call() {
    withCredentials([
        string(credentialsId: 'devtalk-jwt-secret', variable: 'JWT_SECRET'),
    ]) {
        sh '''
            : "${CLIENT_URL:=http://localhost:3000}"
            : "${NEXT_PUBLIC_API_URL:=http://localhost:8082}"
            : "${NEXT_PUBLIC_DEPLOY_URL:=http://localhost:3000}"
            : "${COOKIE_SECURE:=false}"
            export CLIENT_URL NEXT_PUBLIC_API_URL NEXT_PUBLIC_DEPLOY_URL COOKIE_SECURE
            docker compose up -d --build
        '''
    }
}
