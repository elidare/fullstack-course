import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserList } from '../reducers/userListReducer'
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'

const Users = () => {
  const dispatch = useDispatch()
  const userList = useSelector((store) => store.userList)

  useEffect(() => {
    dispatch(getUserList())
  }, [dispatch])

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
        <TableContainer
          component={Paper}
          sx={{
            width: 'auto',
            maxWidth: 500,
            ml: 2,
            mt: 2,
            boxShadow: 2,
          }}
        >
          <Typography variant="h6" sx={{ p: 2 }}>
            Users
          </Typography>
          <Table size="small" aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Blogs created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((u) => (
                <TableRow key={u.id} hover>
                  <TableCell>
                    <Link
                      to={`/users/${u.id}`}
                      style={{ textDecoration: 'none', color: '#1976d2' }}
                    >
                      {u.name}
                    </Link>
                  </TableCell>
                  <TableCell>{u.blogs.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}

export default Users
