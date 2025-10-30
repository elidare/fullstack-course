import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const votedAnecdote = action.payload
      return state.map(anecdote => (
        anecdote.id !== action.payload.id ? anecdote : votedAnecdote
      ))
    },
    setAnecdotes(_state, action) {
      return action.payload
    }
  }
})

const { createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(anecdoteSlice.actions.createAnecdote(newAnecdote))
  }
}

export const updateAnecdote = (anecdoteToVote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.vote(anecdoteToVote)
    dispatch(anecdoteSlice.actions.voteAnecdote(votedAnecdote))
  }
}

export default anecdoteSlice.reducer
