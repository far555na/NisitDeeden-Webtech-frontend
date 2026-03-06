pipeline {
    agent any
    environment {
        DOCKER = "/usr/local/bin/docker"
    }

    stages {
        stage('Setup ENV') {
            steps {
                withVault([
                    vaultSecrets: [
                        [
                            path: 'kv/nisit-deeden-frontend-dev',
                            secretValues: [
                                [envVar: 'VITE_API_URL', vaultKey: 'VITE_API_URL'],
                            ]
                        ]
                    ]
                ]) {
                    sh '''printenv | grep -E '^(VITE_)' | sort > .env'''
                }
            }
        }
        
        stage('Deploy') {
            steps {
                sh '''
                    # Fix: Strip the 'desktop' credential store from Docker config
                    if [ -f ~/.docker/config.json ]; then
                        sed -i 's/"credsStore":\\s*"desktop"//g' ~/.docker/config.json
                    fi
                    
                    ${DOCKER} compose down -v
                    ${DOCKER} compose build --no-cache
                    ${DOCKER} compose up -d
                '''
            }
        }

    }
}
