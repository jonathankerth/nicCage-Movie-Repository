import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './movie-view.scss'

export const MovieView = ({ movies }) => {
  const { movieId } = useParams()

  const movie = movies.find((m) => m._id === movieId)

  return (
    <div>
      <div>
        <img className="w-100" src={movie.ImagePath} alt={title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  )
}
