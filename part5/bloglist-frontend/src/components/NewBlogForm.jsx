import { useState } from 'react'

const NewBlogForm = ({ handleCreation }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAdd = (event) => {
    event.preventDefault()
    handleCreation({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAdd}>
        <label>title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></label>
        <label>author: <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} /></label>
        <label>url: <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} /></label>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm