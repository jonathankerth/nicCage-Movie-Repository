import React, { useState } from 'react'

export const SignupView = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    }

    fetch('https://niccage.herokuapp.com/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('Signup successful')
          window.location.reload()
        } else if (response.status === 422) {
          return response.json().then((errorData) => {
            console.error('Error data:', errorData)
            console.log('Error messages:', errorData.errors)

            // Combine the error messages into a single string, separated by new lines
            const errorMessage = errorData.errors
              .map((error) => error.message)
              .join('\n')

            alert(`Signup failed:\n${errorMessage}`)
          })
        } else {
          alert('Signup failed')
        }
      })
      .catch((error) => {
        console.error('Error:', error)
        alert('An error occurred during signup')
      })
  }

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <label className="username-label">
        User:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5"
          className="username-input"
        />
      </label>
      <label className="password-label">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="password-input"
        />
      </label>
      <label className="email-label">
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="email-input"
        />
      </label>
      <label className="birthday-label">
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
          className="birthday-input"
        />
      </label>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  )
}
