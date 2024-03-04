import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './movie-styles.scss'

export const MovieCard = ({ movie }) => {
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
        </Card.Body>
      </Card>
    </div>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    director: PropTypes.string,
    genre: PropTypes.string.isRequired,
  }).isRequired,
}
