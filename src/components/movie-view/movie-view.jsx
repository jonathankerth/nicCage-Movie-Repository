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

  useEffect(() => {}, [user])

  const [isFavorite, setIsFavorite] = useState(false)

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

    const isFav = checkIsFavorite()
    setIsFavorite(isFav)
  }, [user, movie._id, user?.FavoriteMovies])

  const addFavorite = async () => {
    if (!user || !user.Username) {
      console.error('User is not defined or does not have a Username property')
      return
    }

    if (user.FavoriteMovies.includes(movie._id)) {
      return
    }
    try {
      const response = await fetch(
        `https://niccage.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.ok) {
        const updatedUser = await response.json()
        updatedUser.FavoriteMovies = [...updatedUser.FavoriteMovies, movie._id]
        setUser(updatedUser)
        console.log('Movie added to favorites')

        const userDataResponse = await fetch(
          `https://niccage.herokuapp.com/users/${user.Username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        if (userDataResponse.ok) {
          const freshUserData = await userDataResponse.json()
          setUser(freshUserData)
        }
      } else if (response.status === 400) {
        throw new Error(`${movie._id} is already in your favorites`)
      } else {
        throw new Error('Network response was not ok')
      }
    } catch (error) {
      console.error('Error:', error)
      alert(error.message)
    }
  }

  const removeFavorite = async () => {
    if (!user || !user.Username) {
      console.error('User is not defined or does not have a Username property')
      return
    }

    try {
      const response = await fetch(
        `https://niccage.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.ok) {
        const updatedUser = await response.json()
        setUser(updatedUser)
        setIsFavorite(false)
        console.log('Movie removed from favorites')

        const userDataResponse = await fetch(
          `https://niccage.herokuapp.com/users/${user.Username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        if (userDataResponse.ok) {
          const freshUserData = await userDataResponse.json()
          setUser(freshUserData)
        }
      } else {
        throw new Error('Network response was not ok')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleButtonClick = (type) => {
    console.log(user.Username, 'you hit the button')
    if (type === 'add') {
      addFavorite().catch((error) => console.error('Error:', error))
    } else if (type === 'remove') {
      removeFavorite().catch((error) => console.error('Error:', error))
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
              width: '150px',
              height: '200px',
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
            {isFavorite ? (
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
            )}
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
