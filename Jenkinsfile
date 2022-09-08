pipeline {
    agent any
    // agent { dockerfile true }
    // tools {nodejs "nodejs"}

    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                docker { filename 'Dockerfile'}
                // sh 'npm install'
                // sh 'npm start'
            }
        }
        stage('Test') {
            steps{
                echo "this is test phase"
            }
        }
        // stage('Deliver') {
        //     steps {
        //         sh './jenkins/scripts/deliver.sh'
        //         input message: 'Finished using the web site? (Click "Proceed" to continue)'
        //         sh './jenkins/scripts/kill.sh'
        //     }
        // }

    }
}