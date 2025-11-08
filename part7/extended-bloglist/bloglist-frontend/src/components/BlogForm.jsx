import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Typography,
  Stack,
} from '@mui/material'

const BlogForm = ({ handleSubmit }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const submitForm = (event) => {
    event.preventDefault()

    handleSubmit({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <Box
      sx={{
        bgcolor: 'grey.100',
        py: 4,
      }}
    >
      <Card sx={{ width: 268, p: 2, boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Create new blog
          </Typography>

          <form onSubmit={submitForm}>
            <Stack spacing={2}>
              <TextField
                label="Title"
                variant="outlined"
                size="small"
                fullWidth
                value={newBlogTitle}
                onChange={(e) => setNewBlogTitle(e.target.value)}
              />
              <TextField
                label="Author"
                variant="outlined"
                size="small"
                fullWidth
                value={newBlogAuthor}
                onChange={(e) => setNewBlogAuthor(e.target.value)}
              />
              <TextField
                label="URL"
                variant="outlined"
                size="small"
                fullWidth
                value={newBlogUrl}
                onChange={(e) => setNewBlogUrl(e.target.value)}
              />
            </Stack>
            <CardActions sx={{ justifyContent: 'center', mt: 3 }}>
              <Button type="submit" variant="contained" color="primary">
                Create
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

export default BlogForm
