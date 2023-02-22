import { ApolloServer, gql } from "apollo-server";

const tweets = [
  { id: "1", text: "first" },
  { id: "2", text: "second" },
];
const typeDefs = gql`
  type Tweet {
    id: ID!
    text: String!
  }
  type Query {
    allTweets: [Tweet!]
    tweet(id: ID): Tweet!
  }
  type Mutation {
    createTweet(text: String!): Boolean!
    deleteTweet(id: ID!): Boolean!
    updateTweet(id: ID!, newText: String!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(_, { id }) {
      return tweets.find((tweet) => tweet.id === id);
    },
  },
  Mutation: {
    createTweet(text) {
      const newItem = { id: String(tweets.length + 1), text };
      tweets.push(newItem);
      return true;
    },
    deleteTweet(id) {
      const targetIdx = tweets.findIndex((tweet) => tweet.id === id);
      if (targetIdx === 0 || targetIdx) {
        tweets.splice(1, targetIdx + 1);
        return true;
      } else return false;
    },
    updateTweet(id, newText) {
      const targetIdx = tweets.findIndex((tweet) => tweet.id === id);
      tweets[targetIdx] = { ...tweets[targetIdx], text: newText };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(url);
});
