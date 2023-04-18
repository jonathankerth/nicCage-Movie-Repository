import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './movie-view.scss'

export const MovieView = ({ movies }) => {
  const { movieId } = useParams()

  const selectedMovie = movies.find((m) => m._id === movieId)

  // Check if selectedMovie is defined, otherwise return a message
  if (!selectedMovie) {
    return <div>Movie not found.</div>
  }

  return (
    <div>
      <div>
        <img
          className="w-100"
          src={selectedMovie.ImagePath}
          alt={selectedMovie.title}
        />
      </div>
      <div>
        <span>Title: </span>
        <span>{selectedMovie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{selectedMovie.director}</span> {/* Access director directly */}
      </div>
      <div>
        <span>Genre: </span>
        <span>{selectedMovie.genre}</span> {/* Access genre directly */}
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  )
}
