def call() {
    sh """
        docker run --rm \\
          -v '${env.WORKSPACE}/devTalk-be':/app \\
          -w /app \\
          -e HUSKY=0 \\
          node:20-alpine \\
          sh -c 'npm ci && npm run lint && npx vitest run --coverage'
    """

    sh """
        docker run --rm \\
          -v '${env.WORKSPACE}/devTalk-fe':/app \\
          -w /app \\
          -e HUSKY=0 \\
          node:22-alpine \\
          sh -c 'npm ci && npm run lint && npm run type-check && npm run test:coverage'
    """
}
