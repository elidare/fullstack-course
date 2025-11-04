const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username&nbsp;
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
        </div>
        <div>
          <label>
            Password&nbsp;
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default LoginForm
