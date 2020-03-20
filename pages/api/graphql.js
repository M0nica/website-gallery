import { ApolloServer, gql } from "apollo-server-micro";
import screenshot from "node-server-screenshot";
import { getThumURL } from "thum.io";
import data from "./data/websites.yml";

const typeDefs = gql`
  type Query {
    websites: [url!]!
  }
  type url {
    address: String
    name: String
    photo: String
  }
`;

const resolvers = {
  Query: {
    websites(parent, args, context) {
      return data.map(website => {
        screenshot.fromURL(
          website.url,
          `./public/${website.name.split(" ").join("")}-screenshot.png`,
          {
            waitAfterSelector: String["html"],
            waitMilliseconds: 200
          },
          function() {
            // saving screenshot in the `/public` directory
          }
        );

        return {
          name: website.name,
          address: website.url,
          photo: `/${website.name.split(" ").join("")}-screenshot.png`
        };
      });
    }
  }
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: "/api/graphql" });
