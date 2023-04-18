import PropTypes from 'prop-types'
import { Container, Row, Col } from 'react-bootstrap'
import './movie-view.scss'

export const MovieView = ({ movie, onBackClick }) => {
  const { title, director, genre, ImagePath } = movie
  return (
    <Container>
      <Row>
        <Col xs={12} md={6}>
          <img src={ImagePath} alt={title} className="img-fluid" />
        </Col>
        <Col xs={12} md={6}>
          <div>
            <span>Title: </span>
            <span>{title}</span>
          </div>
          <div>
            <span>Director: </span>
            <span>{director.name}</span>
          </div>
          <div>
            <span>Genre: </span>
            <span>{genre.name}</span>
          </div>
          <button onClick={onBackClick}>Back</button>
        </Col>
      </Row>
    </Container>
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
