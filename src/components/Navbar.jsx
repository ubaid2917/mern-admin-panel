import React from "react";
import { Navbar, Container } from "react-bootstrap";

function Topbar() {
  return (
    <Navbar bg="light" className="shadow-sm">
      <Container>
        <Navbar.Brand>Admin Panel</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Topbar;
