defmodule MangaApi.Web.MangaController do
  use MangaApi.Web, :controller

  alias MangaApi.Mangas

  action_fallback MangaApi.Web.FallbackController

  def index(conn, _params) do
    mangas = Mangas.list_mangas()
    render(conn, "index.json", mangas: mangas)
  end

  def show(conn, %{"id" => id}) do
    manga = Mangas.get_manga!(id)
    render(conn, "show.json", manga: manga)
  end
end
