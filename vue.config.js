const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    compress: true,
    public: 'quiz-front-prod-production.up.railway.app'
  }
})
