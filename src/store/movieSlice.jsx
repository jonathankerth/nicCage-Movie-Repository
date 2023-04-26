import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  movies: [],
  filter: '',
  user: {
    _id: '',
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
    FavoriteMovies: [],
  },
}

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    addFavoriteMovie: (state, action) => {
      const { movieId } = action.payload
      state.user.FavoriteMovies.push(movieId)
    },
    removeFavoriteMovie: (state, action) => {
      const { movieId } = action.payload
      state.user.FavoriteMovies = state.user.FavoriteMovies.filter(
        (id) => id !== movieId
      )
    },
  },
})

export const {
  setMovies,
  setFilter,
  setUser,
  addFavoriteMovie,
  removeFavoriteMovie,
} = movieSlice.actions

export default movieSlice.reducer
