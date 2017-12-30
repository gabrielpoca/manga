defmodule MangaApi.Web.Router do
  use MangaApi.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", MangaApi.Web do
    pipe_through :api
    resources "/mangas", MangaController, only: [:index, :show] do
      resources "/chapters", ChapterController, only: [:show]
    end
  end
end
