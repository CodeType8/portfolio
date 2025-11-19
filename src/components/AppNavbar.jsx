// src/components/AppNavbar.jsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

function AppNavbar() {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded((prev) => !prev);
  const handleClose = () => setExpanded(false);

  const navLinkClass = ({ isActive }) =>
    "nav-link" + (isActive ? " active fw-semibold" : "");

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={handleClose}>
          CodeType Web
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" onClick={handleToggle} />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link
              as={NavLink}
              to="/codetype-bar"
              className={navLinkClass}
              onClick={handleClose}
            >
              CodeType Bar
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/streaming"
              className={navLinkClass}
              onClick={handleClose}
            >
              Streaming / Plex
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/portfolio"
              className={navLinkClass}
              onClick={handleClose}
            >
              Portfolio
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/game-server"
              className={navLinkClass}
              onClick={handleClose}
            >
              Game Server
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/access-info"
              className={navLinkClass}
              onClick={handleClose}
            >
              Access Info
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
