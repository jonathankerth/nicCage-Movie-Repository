import { PropTypes } from 'prop-types'
import { Button, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { MovieCard } from '../movie-card/movie-card'
import { useEffect, useState } from 'react'

export const MovieView = ({ movies, user, setUser, token, updateUser }) => {
  const { movieId } = useParams()
  const movie = movies.find((m) => m._id === movieId)
  const similarMovies = movies.filter(
    (m) => m.genre === movie.genre && m._id !== movie._id
  )

  const [isFavorite, setIsFavorite] = useState(null)

  useEffect(() => {
    const checkIsFavorite = () => {
      if (user && user.FavoriteMovies) {
        return user.FavoriteMovies.some(
          (favMovieId) => favMovieId === movie._id
        )
      } else {
        return false
      }
    }

    setIsFavorite(checkIsFavorite())
  }, [user, movie._id])

  const addFavorite = () => {
    if (!user || !user.Username) {
      console.error('User is not defined or does not have a Username property')
      return
    }

    if (user.FavoriteMovies.includes(movie._id)) {
      setIsFavorite(true)
      return
    }

    fetch(
      `https://niccage.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else if (response.status === 400) {
          throw new Error(`${movie._id} is already in your favorites`)
        } else {
          throw new Error('Network response was not ok')
        }
      })
      .then((updatedUser) => {
        setUser(updatedUser)
        setIsFavorite(true)
      })
      .catch((error) => {
        console.error('Error:', error)
        alert(error.message)
      })
  }

  const removeFavorite = () => {
    if (!user || !user.Username) {
      console.error('User is not defined or does not have a Username property')
      return
    }

    fetch(
      `https://niccage.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((updatedUser) => {
        setUser(updatedUser)
        setIsFavorite(false)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const handleButtonClick = (type) => {
    console.log('you hit the button')

    if (type === 'add') {
      addFavorite()
    } else if (type === 'remove') {
      removeFavorite()
    }
  }

  return (
    <div className="movie-view">
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
            <Button variant="warning">Back</Button>
          </Link>
          <Col md={3}>
            {user &&
              user.FavoriteMovies &&
              (user.FavoriteMovies.includes(movie._id) ? (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleButtonClick('remove')}
                >
                  Remove from Favorites
                </Button>
              ) : (
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleButtonClick('add')}
                >
                  Add to Favorites
                </Button>
              ))}
          </Col>

          <h3 className="mt-3 mb-3 text-dark">You may also like:</h3>
        </div>
      </Col>
      {similarMovies.map((movie) => (
        <Col className="mb-4" key={movie._id} xl={2} lg={3} md={4} xs={6}>
          <MovieCard
            movie={movie}
            user={user}
            onRemoveFavorite={removeFavorite}
          />
        </Col>
      ))}
    </div>
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
