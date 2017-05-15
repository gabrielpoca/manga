defmodule MangaApi.Web.MangaView do
  use MangaApi.Web, :view
  alias MangaApi.Web.{MangaView, ChapterView}

  def render("index.json", %{mangas: mangas}) do
    render_many(mangas, MangaView, "preview.json")
  end

  def render("show.json", %{manga: manga}) do
    render_one(manga, MangaView, "manga.json")
  end

  def render("preview.json", %{manga: manga}) do
    %{
      id: manga["mangaId"],
      cover: String.replace_prefix(manga["cover"], "http:", "https:"),
      name: manga["name"]
    }
  end

  def render("manga.json", %{manga: manga}) do
    %{
      id: manga["href"],
      cover: String.replace_prefix(manga["cover"], "http:", "https:"),
      name: manga["name"],
      author: manga["author"],
      artist: manga["artist"],
      yearOfRelease: manga["yearOfRelease"],
      genres: manga["genres"],
      info: manga["info"],
      lastUpdate: manga["lastUpdate"],
      chapters: render_many(manga["chapters"], ChapterView, "preview.json")
    }
  end
end
