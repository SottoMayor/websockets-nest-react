import { Button, Card, Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

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

interface User {
  id: number;
  name: string;
}

function App() {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        setUsers(data.users);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
          setError(err.message);
        } else {
          console.error('Erro desconhecido:', err);
        }
      }
      setLoading(false);
    }
    
    fetchData();
  }, []);

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('newUser', (newUser) => {
      console.log('Novo usuário recebido:', newUser);
      setUsers((prevUsers) => [...prevUsers, newUser]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <main className='d-flex flex-column vh-100'>
      
      {Header()}

      <Container className="flex-grow-1 flex-column gap-3 d-flex align-items-left justify-content-start">
        <h2>Users</h2>

        <div className='d-flex gap-3'>

          { 
            users.map((user, index) => (
              <Card key={index} style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>User {index + 1}</Card.Title>
                  <Card.Text>
                    Name: {user.name}
                  </Card.Text>
                  <Card.Text>
                    ID: {`#${user.id}`}
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            ))
          }

        </div>
        
      </Container>

      {Footer()}
     
      </main>
  )
}

export default App
