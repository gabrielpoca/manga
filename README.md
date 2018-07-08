Manga Reader
============

This is a manga reading application. It has a client in React and an api in Phoenix.

Development
-----------

Prerequisites:

  * elixir 1.5.2
  * node
  * yarn
  * an account in [Mashape's market](https://market.mashape.com). Create an
    application and include the [Manga Scrapper API](https://market.mashape.com/doodle/manga-scraper).
    Save the application's API KEY.

Setup:

  * Setup environment with `bin/setup`
  * Update the environment variables in `.envrc`.

Running in development:

  * source the environment variables `source .envrc` (you can use [direnv](https://github.com/direnv/direnv) to automate this step)
  * start Phoenix server with `bin/server`
  * start React client with `bin/client`

Now visit the api in http://localhost:4000/api/mangas and the client in http://localhost:3000.

Production
----------

There is a docker image in [gabrielpoca/manga](https://hub.docker.com/r/gabrielpoca/manga/). To start the image run:

```
docker run -p 4000:4000 -e "API_KEY=YOUR API KEY" -e "HOST=http://localhost:4000" -e "PORT=4000" -it --rm gabrielpoca/manga:release foreground
```
