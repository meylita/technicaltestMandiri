import React from 'react'
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

export default function Navbar() {
  return (
      <Container>
        <Nav variant="underline" defaultActiveKey="/">
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/coint/:id">Coint List</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
  )
}
