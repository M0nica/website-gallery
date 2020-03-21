import { ApolloServer, gql } from "apollo-server-micro";
import data from "./data/websites.yml";
import captureWebsite from "capture-website";

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
        const fileName = `${website.name.split(" ").join("")}-screenshot.png`;
        console.log(`attempting to capture ${website.url}`);
        captureWebsite
          .file(website.url, `public/${fileName}`, { overwrite: true })
          .catch(error => console.log(error));

        return {
          name: website.name,
          address: website.url,
          photo: `/${fileName}`
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
