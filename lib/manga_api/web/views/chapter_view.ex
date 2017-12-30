defmodule MangaApi.Web.ChapterView do
  use MangaApi.Web, :view
  alias MangaApi.Web.ChapterView

  def render("show.json", %{chapter: chapter}) do
    render_one(chapter, ChapterView, "chapter.json")
  end

  def render("chapter.json", %{chapter: chapter}) do
    %{
      href: chapter["href"],
      name: chapter["name"],
      pages: render_many(chapter["pages"], ChapterView, "page.json")
    }
  end

  def render("preview.json", %{chapter: chapter}) do
    %{
      id: chapter["chapterId"],
      name: chapter["name"]
    }
  end

  def render("page.json", %{chapter: page}) do
    %{
      pageId: page["pageId"],
      url: String.replace_prefix(page["url"], "http:", "https:")
    }
  end
end
