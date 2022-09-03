pipeline {
    agent {
        docker { image 'node:14.17.0-alpine' }
    }
    // environment {
    //     CI = 'true'
    // }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
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