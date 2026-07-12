import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const margin = {
    margin: '20px 5px'
  }

  const submitLogin = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    navigate('/')
  }
  return(
    <form onSubmit={submitLogin} style={margin}>
      <div>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm