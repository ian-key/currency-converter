import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationBar() {
    return (
      <Navbar bg="light" >
          <Navbar.Brand>React Currency Converter - Portfolio Project</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Currency Table
            </Nav.Link>
            <Nav.Link as={Link} to="/single-currency">
              Single Conversion
            </Nav.Link>
          </Nav>
      </Navbar>
    );
}

export default NavigationBar;
