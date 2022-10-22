import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer className='bg footer'>
      <Container>
        <Row>
            <Col className='text-center py-3'>Copyright &copy; Nasseh E-Wares</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
