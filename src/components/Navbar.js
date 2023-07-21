import React from 'react'
import Nav from 'react-bootstrap/Nav';

export default function Navbar() {
  return (
    <Nav variant="underline" defaultActiveKey="/home">
    <Nav.Item>
      <Nav.Link href="/home">Home</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/coint/:id">Coint List</Nav.Link>
    </Nav.Item>
  </Nav>
  )
}
