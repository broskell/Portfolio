import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    env: {
      MONGODB_URI: 'mongodb://127.0.0.1:27017/portfolio-test'
    },
    fileParallelism: false,
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true
      }
    }
  }
})
