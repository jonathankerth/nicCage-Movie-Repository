import { PropTypes } from 'prop-types'
import { Button, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { MovieCard } from '../movie-card/movie-card'
import { useEffect, useState } from 'react'

export const MovieView = ({ movies, user, token, updateUser }) => {
  const { movieId } = useParams()
  const movie = movies.find((m) => m._id === movieId)
  const similarMovies = movies.filter(
    (m) => m.genre === movie.genre && m._id !== movie._id
  )

  const [isFavorite, setIsFavorite] = useState(
    user && user.FavoriteMovies
      ? user.FavoriteMovies.includes(movie._id)
      : false
  )

  useEffect(() => {
    setIsFavorite(
      user && user.favoriteMovies
        ? user.FavoriteMovies.includes(movie._id)
        : false
    )
    window.scrollTo(0, 0)
  }, [movieId, user])

  const addFavorite = () => {
    console.log(user, 'dawg')
    console.log(user.Username, 'no dawg')
    console.log(movie._id)
    fetch(`/users/${user.Username}/movies/${movieId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((updatedUser) => {
        setUser(updatedUser)
        setIsFavorite(true)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const removeFavorite = () => {
    console.log(user)
    fetch(`/users/${user.Username}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        setUser(updatedUser)
        setIsFavorite(false)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <>
      <Col md={12}>
        <div className="text-dark">
          <img
            className="float-start me-3 mb-2"
            src={movie.image}
            alt="Movie Cover Image"
            style={{
              width: '150px', // Adjust the width as needed
              height: '200px', // Adjust the height as needed
              objectFit: 'cover',
              color: 'black',
            }}
          />
          <h2>{movie.title}</h2>
          <h4>Genre: {movie.genre}</h4>
          <h4>Director: {movie.director}</h4>
          <Link to={'/'}>
            <Button variant="primary">Back</Button>
          </Link>
          {isFavorite ? (
            <Button variant="danger" className="ms-2" onClick={removeFavorite}>
              Remove from favorites
            </Button>
          ) : (
            <Button variant="primary" className="ms-2" onClick={addFavorite}>
              Add to favorites
            </Button>
          )}
          <div style={{ height: '100px' }} />{' '}
          {/* Adjust the height value as needed */}
          <h3 className="mt-3 mb-3 text-dark">You may also like:</h3>
        </div>
      </Col>
      {similarMovies.map((movie) => (
        <Col className="mb-4" key={movie._id} xl={2} lg={3} md={4} xs={6}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </>
  )
}

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired
  ),
}
