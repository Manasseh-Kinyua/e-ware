import React from 'react'
import { Navbar, Nav, Row, Container } from 'react-bootstrap'

function Header() {
  return (
    <header className='fixed-nav'>
      <Navbar className='bg ' bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
                {/* <LinkContainer to='/'> */}
                <Navbar.Brand>Nasseh E-Wares</Navbar.Brand>
                {/* </LinkContainer> */}

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {/* <LinkContainer to='/cart'> */}
                            <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
                        {/* </LinkContainer> */}

                        {/* <LinkContainer to='/login'> */}
                            <Nav.Link><i className='fas fa-user'></i>Login</Nav.Link>
                        {/* </LinkContainer> */}
                        {/* <Nav.Link href="#" disabled>
                        Link
                        </Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header
