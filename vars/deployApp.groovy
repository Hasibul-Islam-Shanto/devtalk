def call() {
    withCredentials([
        string(credentialsId: 'devtalk-jwt-secret', variable: 'JWT_SECRET'),
    ]) {
        sh '''
            ENV_FILE="${JENKINS_HOME:-/var/lib/jenkins}/devtalk.env"
            if [ ! -f "$ENV_FILE" ]; then
              echo "Create ${ENV_FILE} on this machine"
              exit 1
            fi
            unset CLIENT_URL NEXT_PUBLIC_API_URL NEXT_PUBLIC_DEPLOY_URL COOKIE_SECURE
            set -a
            . "$ENV_FILE"
            set +a
            : "${COOKIE_SECURE:=false}"
            if [ -z "$CLIENT_URL" ] || [ -z "$NEXT_PUBLIC_API_URL" ] || [ -z "$NEXT_PUBLIC_DEPLOY_URL" ]; then
              echo "${ENV_FILE} must set CLIENT_URL, NEXT_PUBLIC_API_URL, and NEXT_PUBLIC_DEPLOY_URL"
              exit 1
            fi
            export CLIENT_URL NEXT_PUBLIC_API_URL NEXT_PUBLIC_DEPLOY_URL COOKIE_SECURE
            docker compose up -d --build
        '''
    }
}
