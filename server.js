const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

const User = require('./models/User');
const Recipe = require('./models/Recipe');
const { resolvers } = require('./resolvers');
const { typeDefs } = require('./schema');
require('dotenv').config();

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => 'Mongo connected')
  .catch(e => console.error(e));

const PORT = process.env.PORT || 3001;

const playground = {
  settings: {
    'editor.cursorShape': 'line'
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: false,
  context: ({ req: { currentUser } }) => ({
    User,
    Recipe,
    currentUser
  }),
  playground
});

const app = express();

/* authorization middleware */
app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  if (token !== 'null') {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (error) {
      console.error(error);
    }
  }
  next();
});

server.applyMiddleware({
  app,
  bodyParserConfig: bodyParser.json(),
  cors: {
    credentials: true,
    origin: 'http://localhost:3000'
  }
});

app.listen(PORT, () => `PORT on ${PORT} and ${server.graphqlPath}`);
