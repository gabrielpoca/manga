# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :manga_api, MangaApi.Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "9It6jxMrCBshd6Tari0YCFqSadXgxkxvzP9JJt222ALCkyRGMfFnMrrevnCeW1/F",
  render_errors: [view: MangaApi.Web.ErrorView, accepts: ~w(json)],
  pubsub: [name: MangaApi.PubSub,
           adapter: Phoenix.PubSub.PG2]

config :manga_api, MangaApi.MangaClient.Client,
  api: MangaApi.MangaClient.API,
  key: System.get_env("API_KEY")

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
