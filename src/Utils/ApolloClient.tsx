import { ApolloClient, InMemoryCache, ApolloLink, from } from '@apollo/client'
// import { createUploadLink } from 'apollo-upload-client'
const { createUploadLink } = require('apollo-upload-client')

const uri = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_API : process.env.REACT_APP_PROD_API
const httpLink = new createUploadLink({ uri })
// const httpLink = new createUploadLink()

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({headers = {} }) => ({
    headers: {
      ...headers,
      'x-token': localStorage.getItem('ACCESS_TOKEN') || null
    }
  }));
  return forward(operation);
});
export const client = new ApolloClient({
  // uri: 'https://countries-274616.ew.r.appspot.com/',
  // uri: 'http://localhost:3000',
  // headers: {
  //   'x-token': localStorage.getItem('ACCESS_TOKEN') || ''
  cache: new InMemoryCache({
    typePolicies: {
      BasicPurchase: {
        keyFields: ['_id']
      },
      PurchaseList: {
        keyFields: ['__typename']
      }
    }
  }),
  link: from([
    authMiddleware,
    httpLink
  ])
});
