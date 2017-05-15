defmodule MangaApi.Web.Router do
  use MangaApi.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :put_secure_browser_headers
  end

  scope "/api", MangaApi.Web do
    pipe_through :api
    resources "/mangas", MangaController, only: [:index, :show] do
      resources "/chapters", ChapterController, only: [:show]
    end
  end

  scope "/", MangaApi.Web do
    pipe_through :api
    get "/*path", PagesController, :index
  end
end
