import React, { useState } from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap'
import './signup-view.scss'

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
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
          <Form onSubmit={handleSubmit} className="signup-form">
            <FormGroup>
              <Form.Label>Username:</Form.Label>
              <FormControl
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="5"
                className="username-input"
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Password:</Form.Label>
              <FormControl
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="password-input"
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Email:</Form.Label>
              <FormControl
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="email-input"
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Birthday:</Form.Label>
              <FormControl
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
                className="birthday-input"
              />
            </FormGroup>
            <Button type="submit" className="submit-button">
              Signup
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
