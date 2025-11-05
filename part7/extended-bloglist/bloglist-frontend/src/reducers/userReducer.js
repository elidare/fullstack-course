import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(_state, action) {
      return action.payload
    },
  },
})

const { setUser } = userSlice.actions

export const login = ({ username, password }) => {
  return async (dispatch) => {
    let user = null
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
    } else {
      user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user))
    }
    dispatch(setUser(user))
    blogService.setToken(user.token)
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedBlogsappUser')
  }
}

export default userSlice.reducer
