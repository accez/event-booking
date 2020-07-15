const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const graphqlHttp = require('express-graphql')
require('dotenv').config()

const graphqlSchema = require('./graphql/schema/schema')
const graphqlResolvers = require('./graphql/resolvers/resolvers')
const isAuth = require('./middleware/is-auth')

const app = express()

app.use(bodyParser.json())

app.use(isAuth)

app.use('/graphql', graphqlHttp({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true
}))

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.wbj0u.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority
`)
  .then(() => {
    app.listen(3000)
  })
  .catch(error => {
    console.log(error)
  })