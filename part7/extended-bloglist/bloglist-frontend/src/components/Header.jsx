import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

const Header = ({ currentUser, handleLogout }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ textTransform: 'none' }}
          >
            Blogs
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/users"
            sx={{ textTransform: 'none' }}
          >
            Users
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {currentUser.name}
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              borderColor: 'white',
              textTransform: 'none',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
            }}
          >
            Log out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default Header
