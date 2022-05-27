# David's Obsidian Demo
`obsidian` server caching demo using `deno`. 

This demo is designed to demonstrate Obsidian server caching in a basic backend app. 

It's set up so you can easily compare it to the functionality of `oak_graphql`, which does essentially the same thing, but without caching. In fact, if you look through the code base of the Obsidian backend caching service, you'll find striking similarities between the two (as if they used it as a template 👀).

# Helpful Links

`server.js` code is based on the `README` in the `oak_graphql` documentation:<br />
https://github.com/aaronwlee/oak-graphql

video exampmle of setting up `oak_graphql` in `deno`:<br />
https://www.youtube.com/watch?v=Rc_HhL55JZM&t=384s

`obsidian` source code:<br />
https://github.com/open-source-labs/obsidian

`graphql` documentation (the library used to make GraphQL query requests):
https://graphql.org/graphql-js/graphql/#graphql

# Instructions
1. Make necessary installs (use default everything):<br />
  redis: https://redis.io/docs/getting-started/installation/install-redis-on-mac-os/<br />
  deno: https://deno.land/manual/getting_started/installation<br />
  denon: https://deno.land/manual/getting_started/installation (make sure to add denon to your PATH: https://stackoverflow.com/questions/62057786/zsh-command-not-found-denon-even-after-installing-denon)
2. Toggle comments in `server.js` such that the import statements and `GraphQLService` variable construction are both with respect to Obsidian (they should be by default)
3. In a terminal, start a redis server: `redis-server`
4. In a different terminal, run the denon start script: `denon start`
5. Open the graphQL sandbox -> go to "http://localhost:8000/graphql"<br />
    Note: the url to the sandbox is the same (by default) in both `obsidian` and `oak_graphql` - look in `src/Obsidian.ts` in the Obsidian source code and you'll find that they import the playground from `oak_graphql` (implemented on line 153)
6. Make a get request in the playground or postname (if you use postman, set the request type to POST and create the query as GraphQL data type): <br />
  Another quirk - you MUST include a field "id" and a field "__typename" in your request. "__typename" is metadata in the GraphQL query.
  ```
    query {
      getUser {
        id
        firstName
        __typename
      }
    }
  ```
7. Check the cache for the query:
  * launch the Redis CLI in a new terminal: type `redis-cli`
  * view all available keys in the cache: `KEYS *`
  