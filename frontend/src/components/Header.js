import React from 'react'
import { Navbar, Nav, Row, Container, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { logout } from '../actions/userActions'

function Header() {

    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/login')
    }

  return (
    <header className='fixed-nav'>
      <Navbar className='bg ' bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                <Navbar.Brand>Nasseh E-Wares</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <LinkContainer to='/cart'>
                            <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
                        </LinkContainer>

                        {userInfo ? (
                            <NavDropdown
                                title={userInfo.name}
                                id='username'>
                                    <LinkContainer
                                        to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to='/login'>
                                <Nav.Link><i className='fas fa-user'></i>Login</Nav.Link>
                            </LinkContainer>
                        )}

                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown
                                title='ADMIN'
                                id='username'>
                                    <LinkContainer
                                        to='/admin/userlist'>
                                            <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer
                                        to='/admin/productlist'>
                                            <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer
                                        to='/admin/orders'>
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                            </NavDropdown>
                        )}

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
