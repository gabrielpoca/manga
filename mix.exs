defmodule MangaApi.Mixfile do
  use Mix.Project

  def project do
    [app: :manga_api,
     version: "0.0.1",
     elixir: "~> 1.4",
     elixirc_paths: elixirc_paths(Mix.env),
     compilers: [:phoenix, :gettext] ++ Mix.compilers,
     start_permanent: Mix.env == :prod,
     deps: deps()]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [mod: {MangaApi.Application, []},
     extra_applications: [:logger, :runtime_tools]]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_),     do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [{:phoenix, "~> 1.3.0"},
     {:phoenix_pubsub, "~> 1.0"},
     {:exvcr, "~> 0.8", only: :test},
     {:httpoison, "~> 0.11.1"},
     {:gettext, "~> 0.11"},
     {:cors_plug, "~> 1.2"},
     {:plug_static_index_html, "~> 0.1.0"},
     {:mix_docker, "~> 0.4.1"},
     {:cowboy, "~> 1.0"}]
  end
end
