defmodule MangaApi.Web.PagesController do
  use MangaApi.Web, :controller

  def index(conn, _params) do
    send_file(conn, 200, "priv/static/index.html")
  end
end
