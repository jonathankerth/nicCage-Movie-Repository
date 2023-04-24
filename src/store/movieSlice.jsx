import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  movies: [],
  filter: '',
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
  },
})

export const { setMovies, setFilter } = movieSlice.actions

export default movieSlice.reducer
