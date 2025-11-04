import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', success: true }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(_state, action) {
      return action.payload
    },
    removeNotification(_state, _action) {
      return initialState
    }
  }
})

const { showNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, success=false) => {
  return async (dispatch) => {
    dispatch(showNotification({ message, success }))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer
