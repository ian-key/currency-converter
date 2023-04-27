import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationBar() {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>React Currency Converter</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              All Currencies
            </Nav.Link>
            <Nav.Link as={Link} to="/single-currency">
              Single Currency
            </Nav.Link>
          </Nav>
          </Container>
      </Navbar>
    );
}

export default NavigationBar;
