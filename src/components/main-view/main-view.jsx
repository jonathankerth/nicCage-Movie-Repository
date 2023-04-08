import React, { useState, useEffect } from 'react';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  useEffect(() => {
    fetch("https://niccage.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = (data?.docs || []).map((doc) => ({
          id: doc?.key,
          title: doc?.title,
          image: doc?.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : null,
          author: doc?.author_name?.[0] ?? 'Unknown'
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, []);
  


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