import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function Footer() {
    const currentYear = new Date().getFullYear()
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3' style={{"fontWeight": 'bold'}}>
                <p>EcomHUB ©️ {currentYear}</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}
