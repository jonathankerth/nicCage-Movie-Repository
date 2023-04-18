import { useState, useEffect } from 'react'
import { MovieCard } from '../movie-card/movie-card'
import { MovieView } from '../movie-view/movie-view'
import { LoginView } from '../login-view/login-view'
import { SignupView } from '../signup-view/signup-view'
import { Container, Row, Col } from 'react-bootstrap'

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'))
  const storedToken = localStorage.getItem('token')
  const [user, setUser] = useState(storedUser ? storedUser : null)
  const [token, setToken] = useState(storedToken ? storedToken : null)
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)

  useEffect(() => {
    if (!token) return
    fetch('https://niccage.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data)
      })
  }, [token])

  const handleLogout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const handleLogin = (user, token) => {
    setUser(user)
    setToken(token)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  const handleMovieClick = (newSelectedMovie) => {
    setSelectedMovie(newSelectedMovie)
  }

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={handleLogin} />
        <p>or</p>
        <SignupView />
      </>
    )
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    )
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>
  }

  return (
    <Container>
      <Row>
        <Col>
          <button onClick={handleLogout}>Logout</button>
        </Col>
      </Row>
      <Row>
        {movies.map((movie) => (
          <Col xs={12} md={4} key={movie._id}>
            <MovieCard movie={movie} onMovieClick={handleMovieClick} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}
