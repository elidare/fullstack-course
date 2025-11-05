import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserList } from '../reducers/userListReducer'

const Users = () => {
  const dispatch = useDispatch()
  const userList = useSelector((store) => store.userList)

  useEffect(() => {
    dispatch(getUserList())
  }, [])

  return (
    <div>
      <h1>Users</h1>
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
