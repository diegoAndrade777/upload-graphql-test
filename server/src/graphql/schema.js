import { gql } from "apollo-server-express"

export const typeDefs = gql`  
  scalar Upload

  type File {
    filename: String
    mimetype: String
    encoding: String
    success: Boolean
  }
  
  type Query {
    _ : Boolean
  }
  
  type Mutation {
    singleUpload(file: String!): File!
  }
`
