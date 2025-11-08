import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import userListReducer from './reducers/userListReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    currentUser: userReducer,
    userList: userListReducer,
    blogs: blogReducer,
  },
})

export default store
