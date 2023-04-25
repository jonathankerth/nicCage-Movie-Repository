import { React } from 'react'
import { PropTypes } from 'prop-types'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './movie-card.scss'
import './movie-list.scss'

// The MovieCard function component
export const MovieCard = ({ movie, user, onRemoveFavorite }) => {
  const handleRemoveFavorite = (event) => {
    event.preventDefault()
    onRemoveFavorite(movie._id)
  }

  return (
    <div className="movie-list">
      <Card className="movie-card">
        <Card.Img
          variant="top"
          src={movie.image}
          className="img-flui movie-poster"
        />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Button variant="link" className="my-button">
              Open
            </Button>
          </Link>
          {user && user.FavoriteMovies.includes(movie._id) && (
            <Button variant="danger" onClick={handleRemoveFavorite}>
              Remove Favorite
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    director: PropTypes.string,
    genre: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string),
  }),
  onRemoveFavorite: PropTypes.func,
}
