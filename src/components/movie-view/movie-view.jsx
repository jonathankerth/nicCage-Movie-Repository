import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import './movie-view.scss'

export const MovieView = ({ movies }) => {
  const { movieId } = useParams()
  const selectedMovie = movies.find((m) => m.id === movieId)
  return (
    <div>
      <div>
        <img className="w-100" src={selectedMovie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{selectedMovie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{selectedMovie.director}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{selectedMovie.genre}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  )
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string,
    }),
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
  }).isRequired,
}
