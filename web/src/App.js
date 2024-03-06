import React from 'react';
import './App.css';
import { InMemoryCache } from 'apollo-cache-inmemory'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import {ApolloClient} from "apollo-client"
import {ApolloProvider, Mutation} from "react-apollo"
import gql from "graphql-tag"

const apolloCache = new InMemoryCache()

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql',
  headers: {
    "keep-alive": "true",
    "Content-Type": 'application/json'
  }
})

const client = new ApolloClient({
  cache: apolloCache,
  link: uploadLink
})

const UPLOAD_FILE = gql`
  mutation singleUpload($file: String!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
      success
    }
  }
`;

async function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
  })
}


function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <header className="App-header">
          <h2>File Upload</h2>
            <Mutation mutation={UPLOAD_FILE}>
              {(singleUpload, { data, loading }) => {
                console.log(data)
                
                return (<form onSubmit={() => { console.log("Submitted") }} encType={'multipart/form-data'}>
                  <input name={'document'} type={'file'} onChange={async ({target: { files }}) => {
                    const file = files[0]
                    let fileBase64 = ''
                    await getBase64(file)
                      .then(res => fileBase64 = res)
                      .catch(err => console.log(err))
                  
                    fileBase64 && singleUpload({ variables: { file: fileBase64 } })
                    }
                  }
                  />{loading && <p>Loading.....</p>}</form>
                )}
              }
            </Mutation>
        </header>
      </ApolloProvider>
    </div>
  );
}

export default App;