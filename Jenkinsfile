@Library('devtalk-shared') _

pipeline {
    agent any

    parameters {
        string(name: 'CLIENT_URL', defaultValue: 'http://localhost:3000', description: 'Frontend origin allowed by the API and Socket.IO')
        string(name: 'NEXT_PUBLIC_API_URL', defaultValue: 'http://localhost:8080', description: 'API URL baked into the frontend image at build time')
        string(name: 'NEXT_PUBLIC_DEPLOY_URL', defaultValue: 'http://localhost:3000', description: 'Public frontend URL baked into the frontend image at build time')
        string(name: 'COOKIE_SECURE', defaultValue: 'false', description: 'Set to true only when the site is served over HTTPS')
    }

    stages {
        stage('Code clone from Github') {
            steps {
                script {
                    cloneRepo(scm)
                }
            }
        }

        stage('Test') {
            steps {
                testApp()
            }
        }

        stage('SonarQube Quality Analysis') {
            steps {
                sonarScan()
            }
        }

        stage('Trivy File System Scan') {
            steps {
                trivyScan()
            }
        }

        stage('Build') {
            steps {
                buildApp()
            }
        }

        stage('Deploy') {
            when {
                expression { return env.BRANCH_NAME == null || env.BRANCH_NAME == 'main' }
            }
            steps {
                deployApp()
            }
        }
    }
}
