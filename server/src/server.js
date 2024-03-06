import { ApolloServer } from "apollo-server-express"

import cors from 'cors'
import express from 'express'
import bodyParser from "body-parser"

import { typeDefs } from "../src/graphql/schema.js"
import { resolvers } from "../src/graphql/resolvers.js"

const server = new ApolloServer({
  typeDefs,
  resolvers
})

await server.start()

const app = express()

app.use(cors({ origin: "http://localhost:3000" }))
app.use(express({ uploads: true }))
app.use(bodyParser.json({limit: '50mb'}))
server.applyMiddleware({ app })
app.listen({ port: 4000 }, () => console.log(`Server at http://localhost:4000${server.graphqlPath}`))
