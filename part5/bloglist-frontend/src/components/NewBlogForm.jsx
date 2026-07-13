import { useState } from 'react'
import { Box, Typography, TextField, Button } from "@mui/material"

const NewBlogForm = ({ handleCreation }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAdd = async (event) => {
    event.preventDefault()
    await handleCreation({ title, author, url })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}
    >
      <Typography variant="h3"
        sx={{
          marginY: 2
        }}
      >
        create new
      </Typography>
      <Box
        component="form"
        onSubmit={handleAdd}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          width: 450
        }}
      >
        <TextField
          label="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size="small"
        />
        <TextField
          label="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          size="small"
        />
        <TextField
          label="url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          size="small"
        />
        <Button variant="contained" type="submit" sx={{alignSelf: 'flex-start'}}>CREATE</Button>
      </Box>

      {/* <form onSubmit={handleAdd}>
        <div><label>title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></label></div>
        <div><label>author: <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} /></label></div>
        <div><label>url: <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} /></label></div>
        <button type="submit">create</button>
      </form> */}
    </Box>
  )
}

export default NewBlogForm