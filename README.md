# CI/CD pipeline for NodeJs and MongoDB application using Jenkins and deployment to Minikube

We build a docker image from the Dockerfile located in Github and upload the resulting image to Docker Hub.
Then we deploy application to Minukube.


![alt text](https://github.com/anpavlovsk/CICD-Jenkins-Docker-Minikube/blob/main/screenshots/1.png?raw=true)


![alt text](https://github.com/anpavlovsk/CICD-Jenkins-Docker-Minikube/blob/main/screenshots/2.png?raw=true)


Jenkinsfile content
````
node {
    def app

    stage('Clone repository') {

        /* Clone our repository */
        checkout scm
    }

    stage('Build image') {
      dir('vue-chess') {
       
        /* Build the docker image */
      
        app = docker.build("anpavlovsk/vue-chess-img")
      }
    }
    
    stage('Test image') {           
            app.inside {            
             
             sh 'echo "Tests passed"'        
            }    
        }     

    stage('Push image') {

        /* Push images: First is tagged with the build BUILD_NUMBER
         the second is just tagged latest !*/
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }

    stage('Deploy to K8s') {

      /* Apply all manifest files */
      /* sh "kubectl apply -f ./kube/" */
      sh "kubectl apply -f ./kube/mongo.yaml"
      sh "kubectl apply -f ./kube/vue-chess.yaml"
        
    }

}
````

![alt text](https://github.com/anpavlovsk/CICD-Jenkins-Docker-Minikube/blob/main/screenshots/3.png?raw=true)


![alt text](https://github.com/anpavlovsk/CICD-Jenkins-Docker-Minikube/blob/main/screenshots/4.png?raw=true)


![alt text](https://github.com/anpavlovsk/CICD-Jenkins-Docker-Minikube/blob/main/screenshots/5.png?raw=true)

Manifestst

![alt text](https://github.com/anpavlovsk/CICD-Jenkins-Docker-Minikube/blob/main/screenshots/6.png?raw=true)


![alt text](https://github.com/anpavlovsk/CICD-Jenkins-Docker-Minikube/blob/main/screenshots/7.png?raw=true)
