import { Button, Card, Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function Header () {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Web Users</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-start">
            <p>&copy; {new Date().getFullYear()} My Website. All rights reserved or something like that.</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <a href="#privacy" className="text-light mx-2">Privacy</a>
            <a href="#terms" className="text-light mx-2">Usage</a>
            <a href="#contact" className="text-light mx-2">Contact</a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

function App() {

  return (
    <main className='d-flex flex-column vh-100'>
      
      {Header()}

      <Container className="flex-grow-1 flex-column gap-3 d-flex align-items-left justify-content-start">
        <h2>Users</h2>

        <div className='d-flex gap-3'>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>User X</Card.Title>
              <Card.Text>
                Name: John Doe
              </Card.Text>
              <Card.Text>
                ID: {`#1`}
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>User X</Card.Title>
              <Card.Text>
                Name: John Doe
              </Card.Text>
              <Card.Text>
                ID: {`#1`}
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>User X</Card.Title>
              <Card.Text>
                Name: John Doe
              </Card.Text>
              <Card.Text>
                ID: {`#1`}
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>

        </div>
        
      </Container>

      {Footer()}
     
      </main>
  )
}

export default App
