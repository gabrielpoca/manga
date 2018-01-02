Manga Reader
============

This is a manga reading application. It has a client in React and an api in Phoenix.

Development
-----------

Prerequisites:

  * Elixir 1.5.2
  * Node
  * Yarn
  * An account in [Mashape's market](https://market.mashape.com). Create an
    application and include the [Manga Scrapper API](https://market.mashape.com/doodle/manga-scraper).
    Save the application's API KEY.

Setup:

  * Setup environment with `bin/setup`
  * Update the environment variables in `.env`.

Running in development:

  * Start Phoenix server with `bin/server`
  * Start React client with `bin/client`

Now you can visit the api in http://localhost:4000/api/mangas and the client in http://localhost:3000.

Production
----------

There is a docker image in [gabrielpoca/manga](https://hub.docker.com/r/gabrielpoca/manga/). To start the image run:

```
docker run -p 4000:4000 -e "API_KEY=YOUR API KEY" -e "HOST=http://localhost:4000" -e "PORT=4000" -it --rm gabrielpoca/manga:release foreground
```
