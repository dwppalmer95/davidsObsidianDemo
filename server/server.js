import  { Application } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { applyGraphQL, gql, GQLError } from "https://deno.land/x/oak_graphql/mod.ts";
import { users } from './data/users.js';

const PORT = 8000;
const app = new Application();

const types = gql`
type User {
  firstName: String
  lastName: String
}

input UserInput {
  firstName: String
  lastName: String
}

type ResolveType {
  done: Boolean
}

type Query {
  getUser(id: String): User 
}

type Mutation {
  setUser(input: UserInput!): ResolveType!
}
`;

const resolvers = {
  Query: {
    getUser: () => {
      return users;
    },
  },
  Mutation: {
    setUser: (parent: any, { input: { firstName, lastName } }: any, context: any, info: any) => {
      console.log("input:", firstName, lastName);
      return {
        done: true,
      };
    },
  },
};

const GraphQLService = await applyGraphQL({
  typeDefs: types,
  resolvers: resolvers,
})


app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

app.use(ctx => {
  ctx.response.body = "Hello World";
});

console.log(`Listening on port ${PORT}`);
await app.listen({ port: PORT });
