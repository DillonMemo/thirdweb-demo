import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://api.grid.gg/central-data/graphql',
      headers: {
        'x-api-key': 'LeyErJpFjuVBwykhRnOJxbDfDd8pkTAcIyQL3YdY',
      },
    }),
  })
})
