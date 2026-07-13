import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, TextField, Button } from '@mui/material'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const submitLogin = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    navigate('/')
  }
  return(
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
        Log in to application
      </Typography>
      <Box
        component="form"
        onSubmit={submitLogin}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'flex-start'
        }}
      >
        <TextField
          label="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="standard"
        />
        <TextField
          label="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="standard"
        />
        <Button variant="contained" type="submit">Login</Button>
      </Box>
    </Box>
  )
}

export default LoginForm