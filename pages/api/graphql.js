import { ApolloServer, gql } from "apollo-server-micro";
import data from "./data/websites.yml";
import captureWebsite from "capture-website";
import getColors from "get-image-colors";

// TODO: more efficiently process screenshots https://github.com/sindresorhus/capture-website/issues/42
process.setMaxListeners(0);

const typeDefs = gql`
  type Query {
    websites: [url!]!
  }
  type url {
    address: String
    name: String
    photo: String
    colors: [String]
    author: String
  }
`;

const resolvers = {
  Query: {
    websites(parent, args, context) {
      return data.map(({ name, url, author }) => {
        const fileName = `${name.split(" ").join("")}-screenshot.png`;

        console.log(`attempting to capture ${url}`);

        captureWebsite
          .file(url, `public/${fileName}`, {
            overwrite: true,
            delay: 4
          })
          .catch(error => console.log(error));

        const colors = getColors(`public/${fileName}`).then(colors => {
          return colors.map(color => color.hex());
        });

        return {
          name,
          address: url,
          photo: `/${fileName}`,
          colors,
          author
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
