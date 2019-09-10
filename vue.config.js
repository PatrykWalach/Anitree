// eslint-disable-next-line @typescript-eslint/no-var-requires
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end()
  },
  configureWebpack: {
    devtool: 'source-map',
    plugins: [new VuetifyLoaderPlugin()]
  }
}
