defmodule MangaApi.MangaClient.Supervisor do
  use Supervisor

  def start_link do
    Supervisor.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def init(:ok) do
    children = [
      worker(MangaApi.MangaClient.Cache, [[name: MangaApi.MangaClient.Cache]]),
      worker(MangaApi.MangaClient.CacheInvalidator, [])
    ]

    supervise(children, strategy: :one_for_one)
  end
end
