module.exports = {
  client: {
    // Files processed by the extension
    includes: ['src/**/*.gql', 'src/**/*.graphql'],
    service: {
      name: 'anitree',
      // URL to the GraphQL API
      url: 'https://graphql.anilist.co',
    },
  },
}
