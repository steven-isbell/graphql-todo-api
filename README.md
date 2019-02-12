# graphql-todo-api

A GraphQL Todo API to use when testing new frontend tools/frameworks.

Built with Docker, GraphQL, Apollo Server, Redis, and TypeScript.

### Running

* Make sure you have docker installed.
    * You can install it [here](https://docs.docker.com/install/)
* Run `docker-compose up`
* Your app will be running on port `3001` for both the docker container and your local system.
    * If you'd like to use a different port locally, change the first number in the `docker-compose.yml` file under `todo-service > ports` to whichever port you'd like to use locally.
* It will also be running a redis instance on port `6380` for local access and `6379` in the docker container.
