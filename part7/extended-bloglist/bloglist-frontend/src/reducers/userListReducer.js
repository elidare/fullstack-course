import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userListSlice = createSlice({
  name: 'userList',
  initialState: null,
  reducers: {
    setUserList(_state, action) {
      return action.payload
    },
  },
})

const { setUserList } = userListSlice.actions

export const getUserList = () => {
  return async (dispatch) => {
    const users = await userService.getAllUsers()
    dispatch(setUserList(users))
  }
}

export default userListSlice.reducer
