pipeline {
    agent any
    tools {
        nodejs 'node_14.15.4'
    }
    environment {
        //once you sign up for Docker hub, use that user_id here
        registry = "qubedprince/dealflow-image"
        //- update your credentials ID after creating credentials for connecting to Docker Hub
        registryCredential = '	dockerHub'
    }
    stages {
        stage ('Version'){
            steps {
                sh 'npm --version'
            }
        }
        stage ('Dependency'){
            steps {
                sh 'npm install'
            }
        }

		    // Building Docker images
	    stage('Building image') {
	      steps{
          script {
            dockerImage = docker.build registry
          }
	      }
	    }

	     // Uploading Docker images into Docker Hub
	    stage('Upload Image') {
	     steps{
          script {
              docker.withRegistry( '', registryCredential ) {
              dockerImage.push()
              }
          }
	      }
	    }


        stage ('Deploy on Server & Cleanup'){
            steps{
                sh 'ansible-playbook deploy.yml'
            }
        }

    }
    post {
        always {
          emailext body: '''Good Day Engineer,
          Loki issued a report as follows:

          $PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS.

          Check console output at $BUILD_URL to view the results.''', subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: 'tinashe.k@qubedlab.com'
        }      
        failure {
           telegramSend(message: "*JOB* : *${env.JOB_NAME}*\n*Report* : ${env.BUILD_TAG} \n*Branch*: main \n*Build* : ${env.BUILD_ID} \n*Status*: _FAILED_ \n*Vist* : ${env.BUILD_URL} for more informantion\n", chatId: 717316992 )
        }
         success {
            telegramSend(message: "*JOB* : *${env.JOB_NAME}*\n*Report* : ${env.BUILD_TAG} \n*Branch*: main \n*Build* : ${env.BUILD_ID} \n*Status*: _SUCCESS_ \n*Vist* : ${env.BUILD_URL} for more informantion\n", chatId: 717316992)

        }
    }
}
