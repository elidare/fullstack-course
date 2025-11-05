import { useState, useEffect } from 'react'
import userService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState(null)

  const getUsers = async () => {
    const users = await userService.getAllUsers()
    setUsers(users)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>
      <h1>Users</h1>
      {users && (
        <table>
          <thead>
            <th></th>
            <th>Blogs created</th>
          </thead>
          {users.map((u) => (
            <tr>
              <td>{u.name}</td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </table>
      )}
    </div>
  )
}

export default Users
