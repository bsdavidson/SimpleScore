# SimpleScore

A simple Node server for adding a leaderboard functionality to a game. It
provides an API to accept scores and return them for later display in the game.

For a demo, I modded my Deathbot 5000 game, [playable here][deathbot].

## Running the server

To run the server locally, you'll first need to be running a MongoDB server.
Then you can install the dependencies and run the server:

    $ npm install
    $ DB_URI=mongodb://127.0.0.1:27017/simpleserver_dev npm start

Then open http://127.0.0.1:8080/api.

To run tests:

    $ DB_URI=mongodb://127.0.0.1:27017/simpleserver_test npm test

If you don't want to install Node and Mongo manually, you can run the server
using [Docker Compose]. Just run `docker-compose up` and the server will be
available on port 8080 on your Docker host machine (on a Mac using
docker-machine, you'll probably find it at http://192.168.99.100:8080/api).

[deathbot]: http://bsdavidson.github.io/deathbot5000/
[Docker Compose]: https://docs.docker.com/compose/
