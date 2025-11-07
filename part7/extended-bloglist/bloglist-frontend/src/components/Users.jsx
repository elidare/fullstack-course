import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserList } from '../reducers/userListReducer'
import { Typography, Box } from '@mui/material'

const Users = () => {
  const dispatch = useDispatch()
  const userList = useSelector((store) => store.userList)

  useEffect(() => {
    dispatch(getUserList())
  }, [])

  return (
    <div>
      <Box sx={{ borderLeft: 4, borderColor: 'primary.main', pl: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ color: 'text.primary', fontWeight: 600, my: 2 }}
        >
          Users
        </Typography>
      </Box>
      {userList && (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Blogs created</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((u) => (
              <tr key={u.id}>
                <td>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </td>
                <td>{u.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Users
