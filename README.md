MANGA API
=========

To start your Phoenix server:

  * Setup environment with `bin/setup`
  * Update the environment variables in `.env`.
  * Start Phoenix endpoint with `bin/server`

Now you can visit the api in [localhost:4000]
Now you can visit [`localhost:4000/api/mangas`](http://localhost:4000/api/mangas) from your browser.

Production
----------

It uses [mix_docker](https://github.com/Recruitee/mix_docker) in production. You should read the documentation for further instructions.

The command to run the release image should look something like:

```
docker run -it --rm -p 4000:4000 -e HOST=localhost -e PORT=4000 -e SECRET_KEY_BASE=YOUR_SECRET_KEY_BASE -e API_KEY=YOUR_MASHAPE_API_KEY gabrielpoca/manga_api:release foreground
```
