import { useState, useEffect } from 'react'
import { MovieCard } from '../movie-card/movie-card'
import { UpdateForm } from './update-form'
import { FavMovies } from './fav-movies'
import { MovieView } from '../movie-view/movie-view'
import PropTypes from 'prop-types'
import { Button, Container, Form, Row, Col, Card, Link } from 'react-bootstrap'
import './profile-view.scss'

export const ProfileView = ({ user, movies }) => {
  const storedToken = localStorage.getItem('token')
  const storedMovies = JSON.parse(localStorage.getItem('movies'))
  const storedUser = localStorage.getItem('user')

  const [token] = useState(storedToken ? storedToken : null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')
  const [favoriteMovies, setFavoriteMovies] = useState([])

  const [allMovies] = useState(storedMovies ? storedMovies : movies)
  const [filteredMovies, setFilteredMovies] = useState([])

  // Show updated user on the profile
  const getUser = (token) => {
    fetch(`https://niccage.herokuapp.com/users/${user.Username}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('getUser response', response)
        setUsername(response.Username)
        setEmail(response.Email)
        setPassword(response.Password)
        setBirthday(response.Birthday)
        setFavoriteMovies(response.FavoriteMovies)
      })
  }
  console.log('userFavMov', favoriteMovies)

  useEffect(() => {
    getUser(token)
  }, [])

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <div>
                <h4>Your Info</h4>
                <p>Username: {username}</p>
                <p>
                  Birthday:{' '}
                  {new Date(user.Birthday).toLocaleDateString('en-US')}
                </p>
                <p>Email: {email}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <UpdateForm user={user} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {favoriteMovies.length > 0 ? (
        <Row>
          <h4>Favorite Movies</h4>
          {favoriteMovies.map((favoriteMovieId) => {
            const favoriteMovie = movies.find(
              (movie) => movie._id === favoriteMovieId
            )
            if (favoriteMovie) {
              return (
                <Col className="mb-4" key={favoriteMovie._id} md={3}>
                  <MovieCard movie={favoriteMovie} />
                </Col>
              )
            }
            return null
          })}
        </Row>
      ) : (
        <p>You have not added any favorite movies yet.</p>
      )}
    </Container>
  )
}
