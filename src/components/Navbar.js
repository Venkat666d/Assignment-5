import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar as RBNavbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

function Navbar({ onCategoryChange }) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const user = isLoggedIn ? JSON.parse(localStorage.getItem('loggedInUser')) : null;

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser');
    toast.info('Logged out successfully!');
    navigate('/');
  };

  return (
    <RBNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <RBNavbar.Brand>MiniAmazon</RBNavbar.Brand>
        <RBNavbar.Toggle aria-controls="basic-navbar-nav" />
        <RBNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => onCategoryChange('all')}>All</Nav.Link>
            <Nav.Link onClick={() => onCategoryChange('electronics')}>Electronics</Nav.Link>
            <Nav.Link onClick={() => onCategoryChange('jewelery')}>Jewelery</Nav.Link>
            <Nav.Link onClick={() => onCategoryChange("men's clothing")}>Men</Nav.Link>
            <Nav.Link onClick={() => onCategoryChange("women's clothing")}>Women</Nav.Link>
          </Nav>
          {!isLoggedIn ? (
            <>
              <Button variant="outline-light" className="me-2" onClick={() => navigate('/')}>Login</Button>
              <Button variant="outline-light" onClick={() => navigate('/signup')}>Signup</Button>
            </>
          ) : (
            <Nav>
              <NavDropdown title={`👤 ${user?.name || 'Profile'}`} align="end" id="user-dropdown">
                <NavDropdown.ItemText>👋 {user?.name}</NavDropdown.ItemText>
                <NavDropdown.Item onClick={() => navigate('/cart')}>My Cart ({user?.cart?.length || 0})</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/orders')}>My Orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
}

export default Navbar;
