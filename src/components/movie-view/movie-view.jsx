import PropTypes from 'prop-types'

export const MovieView = ({ movie, onBackClick }) => {
  const { Title, Director, Genre, ImagePath } = movie
  return (
    <div>
      <img src={ImagePath} alt={Title} />
      <div>
        <span>Title: </span>
        <span>{Title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{Director.Name}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{Genre.Name}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
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
  onBackClick: PropTypes.func.isRequired,
}
