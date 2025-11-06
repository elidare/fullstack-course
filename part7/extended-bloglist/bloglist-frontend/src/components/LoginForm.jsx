import { useState } from 'react'
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
  Typography,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <Typography variant="h3" component="h1">
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <FormControl
            sx={{ margin: '4px 0', width: '25ch' }}
            variant="standard"
          >
            <InputLabel htmlFor="standard-adornment-text">Username</InputLabel>
            <Input
              id="standard-adornment-text"
              value={username}
              onChange={handleUsernameChange}
            />
          </FormControl>
        </div>
        <div>
          <FormControl
            sx={{ margin: '4px 0', width: '25ch' }}
            variant="standard"
          >
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? 'hide the password'
                        : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <Button
          sx={{ margin: '4px 0' }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Log in
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
