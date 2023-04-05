import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Pulp Fiction",
      image:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/pulpfiction.2436_480x.progressive.jpg?v=1620048742",
      director: "Quentin Tarantino"
    },
    {
      id: 2,
      title: "National Treasure",
      image:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/national_treasure_xlg_480x.progressive.jpg?v=1649430798",
      director: "Jon Turteltaub"
    },
    {
      id: 3,
      title: "National Treasure 2",
      image:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/national_treasure_book_of_secrets_480x.progressive.jpg?v=1636580603",
      director: "Jon Turteltaub"
    },
    {
      id: 4,
      title: "Lord of War",
      image:
        "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/02953ca30b90e50cf232c089805f3b74_37e4d59d-23b6-4f28-be94-5192f5e03105_480x.progressive.jpg?v=1573593994",
      director: "Andrew Niccol"
    },
    {
      id: 5,
      title: "The Sorcerer's Apprentice",
      image:
        "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/6226f5fe9d1fe309935684e3b4b35fe5_292436ca-ed4e-4d36-a98a-9329a6dc1b1b_500x749.jpg?v=1573588607",
      director: "Jon Turteltaub"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};