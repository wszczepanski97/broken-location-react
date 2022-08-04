import { ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { API_URL } from 'constants/'
import 'styles/index.scss'

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
  },
})

const AppContainer = (): ReactElement => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

const container = document.getElementById('root')
if (container) createRoot(container).render(<AppContainer />)
