import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Pulp Fiction",
      image:
      "",
      director: "Quentin Tarantino"
    },
    {
      id: 2,
      title: "National Treasure",
      image:
      "",
      director: "Jon Turteltaub"
    },
    {
      id: 3,
      title: "National Treasure 2",
      image:
      "",
      director: "Jon Turteltaub"
    },
    {
      id: 4,
      title: "Lord of War",
      image:
        "",
      director: "Andrew Niccol"
    },
    {
      id: 5,
      title: "The Sorcerer's Apprentice",
      image:
        "",
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
      <button
        onClick={() => {
          alert("Nice!");
        }}
      >
        Click me!
      </button>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}