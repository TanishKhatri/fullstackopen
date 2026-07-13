import { Paper, Box, Typography, Button, Link } from '@mui/material'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  if (!blog) {
    return null
  }

  const deleteHandler = async () => {
    await handleDelete(blog.id)
  }

  const likeHandler = () => {
    handleLike(blog.id, { ...blog, likes: blog.likes + 1 })
  }

  return (
    <Paper elevation={4} sx={{ marginTop: 2 }}>
      <Box sx={{ padding: 2 }}>
        <Typography component='h3' variant='h4' sx={{ marginBottom: 1 }}>
          {blog.title}
        </Typography>
        <Typography component='p' variant='body1' sx={{ color: 'grey' }}>
          By {blog.author}
        </Typography>
        <Link href={blog.url}>
          {blog.url}
        </Link>
        <Typography component='p' variant='body1' sx={{ color: 'grey' }}>
          Added by {blog.user.name}
        </Typography>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 1,
          gap: 1
        }}>
          <Typography component='p' variant='body1' sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
            likes {blog.likes}
          </Typography>
          {user && <Button onClick={likeHandler} variant='outlined'>Like</Button>}
          {user && user.id === blog.user.id && <Button onClick={deleteHandler} variant='outlined' color='error'>Remove</Button>}
        </Box>
      </Box>
    </Paper>
  )
}

export default Blog