pipeline {
    agent { docker { image 'node:14-alpine' args '-p 3000:3000' } }
    // agent { dockerfile true }
    // tools {nodejs "nodejs"}

    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm start'
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