defmodule MangaApi.Mangas do
  def list_mangas do
    case MangaApi.MangaClient.Client.all do
      {:ok, mangas} -> mangas
      _ -> []
    end
  end

  def get_manga!(id) do
    case MangaApi.MangaClient.Client.manga(id) do
      {:ok, manga} -> manga
      _ -> nil
    end
  end

  def get_chapter!(manga_id, id) do
    case MangaApi.MangaClient.Client.chapter(manga_id, id) do
      {:ok, chapter} -> chapter
      _ -> nil
    end
  end
end
