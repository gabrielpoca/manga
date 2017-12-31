defmodule MangaApi.Web.Endpoint do
  use Phoenix.Endpoint, otp_app: :manga_api

  socket "/socket", MangaApi.Web.UserSocket

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phoenix.digest
  # when deploying your static files in production.
  plug Plug.Static.IndexHtml, at: "/"
  plug Plug.Static,
    at: "/", from: {:manga_api, "priv/static"}, gzip: false

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId
  plug Plug.Logger

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison

  plug Plug.MethodOverride
  plug Plug.Head

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  plug Plug.Session,
    store: :cookie,
    key: "_manga_api_key",
    signing_salt: "/Y2NsQeL"

  plug CORSPlug
  plug :catch_all_but_api
  plug MangaApi.Web.Router

  def catch_all_but_api(%Plug.Conn{request_path: name} = conn, _opts) do
    case String.starts_with?(name, "/api") do
      true -> conn
      _ -> send_file(conn, 200, Application.app_dir(:manga_api, "priv/static/index.html"))
    end
  end

  @doc """
  Dynamically loads configuration from the system environment
  on startup.

  It receives the endpoint configuration from the config files
  and must return the updated configuration.
  """
  def load_from_system_env(config) do
    if config[:load_from_system_env] do
      port = System.get_env("PORT") || raise "expected the PORT environment variable to be set"
      {:ok, Keyword.put(config, :http, [:inet6, port: port])}
    else
      {:ok, config}
    end
  end
end
