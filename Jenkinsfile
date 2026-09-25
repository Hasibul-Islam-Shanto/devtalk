@Library('devtalk-shared') _

pipeline {
    agent any

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
