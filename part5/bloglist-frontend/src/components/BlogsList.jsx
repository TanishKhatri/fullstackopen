import Blog from './Blog'
import { Link } from 'react-router-dom'
import { Typography, Box, List, ListItem } from '@mui/material'

const BlogsList = ({ blogs }) => {
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography component='h2' variant='h4'>
        blogs
      </Typography>
      <List>
        {blogs.map(blog =>
          <ListItem key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
          </ListItem>
        )}
      </List>
    </Box>
  )
}

export default BlogsList
