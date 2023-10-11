import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { MovieCard } from '../movie-card/movie-card'
import { MovieView } from '../movie-view/movie-view'
import { LoginView } from '../login-view/login-view'
import { SignupView } from '../signup-view/signup-view'
import { NavigationBar } from '../navigation-bar/navigation-bar'
import { ProfileView } from '../profile-view/profile-view'
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'
import {
  setMovies,
  setFilter,
  removeFavoriteMovie,
} from '../../store/movieSlice.jsx'

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'))
  const storedToken = localStorage.getItem('token')
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  const onLoggedIn = (userData, userToken) => {
    setUser(userData)
    setToken(userToken)
  }

  const { movies, filter } = useSelector((state) => state.movie)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return

      try {
        const response = await fetch(
          `https://niccage.herokuapp.com/users/${storedUser.Username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        } else {
          throw new Error('Error fetching user data from server')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchUser()
  }, [token])

  useEffect(() => {
    fetch('https://niccage.herokuapp.com/movies')
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            title: movie.title,
            director: movie.director?.name,
            image: movie.ImagePath,
            genre: movie.genre?.name,
          }
        })
        dispatch(setMovies(moviesFromApi))
      })
  }, [dispatch])

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter.toLowerCase())
  )

  const handleRemoveFavorite = (movieId) => {
    dispatch(removeFavoriteMovie({ userId: user._id, movieId }))
    setUser({
      ...user,
      FavoriteMovies: user.FavoriteMovies.filter((id) => id !== movieId),
    })
  }

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null)
          setToken(null)
          localStorage.clear()
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={onLoggedIn} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView
                      setUser={setUser}
                      user={user}
                      token={token}
                      movies={movies}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <ProfileView user={user} movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {user && (
                      <InputGroup className="mb-3">
                        <FormControl
                          placeholder="Filter movies by title..."
                          value={filter}
                          onChange={(e) => dispatch(setFilter(e.target.value))}
                        />
                      </InputGroup>
                    )}
                    {filteredMovies.map((movie) => (
                      <Col className="main" key={movie._id} md={3}>
                        <MovieCard
                          movie={movie}
                          user={user} // Add this line
                          onRemoveFavorite={handleRemoveFavorite}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  )
}
