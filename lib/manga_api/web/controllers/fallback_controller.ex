defmodule MangaApi.Web.FallbackController do
  use MangaApi.Web, :controller

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> render(MangaApi.Web.ErrorView, :"404")
  end
end
