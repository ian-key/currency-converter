import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              All Currencies
            </Nav.Link>
            <Nav.Link as={Link} to="/single-currency">
              Single Currency
            </Nav.Link>
          </Nav>
      </Navbar>
    );
  }
}

export default NavigationBar;
