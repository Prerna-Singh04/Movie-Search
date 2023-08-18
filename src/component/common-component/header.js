import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';

export const MovieSearchHeader = () => {
  return (
    <div>
      <Navbar sticky="top" className="bg-body-tertiary border-0 border-bottom">
        <Container>
          <Navbar.Brand href="/">Movie Seach Platform</Navbar.Brand>
          <Button variant="dark" href='favourities'>Favourities</Button>
        </Container>
      </Navbar>
    </div>
  )
}
