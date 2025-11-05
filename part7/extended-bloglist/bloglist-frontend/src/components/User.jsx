const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <>
      <h1>{user.name}</h1>
      <h2>Added blogs</h2>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
