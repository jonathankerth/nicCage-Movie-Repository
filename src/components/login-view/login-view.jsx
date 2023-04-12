import { useState } from 'react'

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const loginData = {
      access: username,
      secret: password,
    }

    try {
      const response = await fetch('https://niccage.herokuapp.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const responseData = await response.json()

      console.log('Login response: ', responseData)
      if (responseData.user) {
        localStorage.setItem('user', JSON.stringify(responseData.user))
        localStorage.setItem('token', responseData.token)
        onLoggedIn(responseData.user, responseData.token)
      } else {
        throw new Error('User not found')
      }
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}
