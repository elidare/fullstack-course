import { Box, Card, CardContent, Typography } from '@mui/material'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <>
      <Card sx={{ maxWidth: 400, m: 2, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            {user.name}
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Added blogs
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 2,
              m: 0,
            }}
          >
            {user.blogs.map((b) => (
              <li key={b.id}>{b.title}</li>
            ))}
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default User
