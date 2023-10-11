import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

export const NavigationBar = ({ user, onLoggedOut }) => {
  const location = useLocation()

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Nicolas Cage Fan Club
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                {location.pathname !== '/login' && (
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                )}
                {location.pathname !== '/signup' && (
                  <Nav.Link as={Link} to="/signup">
                    Signup
                  </Nav.Link>
                )}
              </>
            )}
            {user && (
              <>
                {location.pathname !== '/' && (
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                )}
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
