defmodule MangaApi.Web.ChapterController do
  use MangaApi.Web, :controller

  alias MangaApi.Mangas

  action_fallback MangaApi.Web.FallbackController

  def show(conn, %{"manga_id" => manga_id, "id" => id}) do
    chapter = Mangas.get_chapter!(manga_id, id)
    render(conn, "show.json", chapter: chapter)
  end
end
