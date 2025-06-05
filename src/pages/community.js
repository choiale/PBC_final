import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.css';
import { Navbar, Nav, Container, Row, Col, Button, Card } from 'react-bootstrap';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Link } from 'react-router-dom';

function Community(){
    return(
        <div>
              {/* Navbar */}
              <Navbar className="navbar">
                <Container>
                  <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <img src="/images/logo-black.png" alt="Logo" style={{ width: '98px', height: '29px' }} />
                  </Navbar.Brand>
                  <Navbar.Toggle />
                  <Navbar.Collapse>
                    <Nav className="mx-auto nav-links">
                      <Nav.Link as={Link} to="/community">커뮤니티</Nav.Link>
                      <Nav.Link as={Link} to="/adopt">분양</Nav.Link>
                      <Nav.Link as={Link} to="/map">지도</Nav.Link>
                      <Nav.Link as={Link} to="/mypage">마이페이지</Nav.Link>
                    </Nav>
                    <div>
                      <Link to="/log">
                        <Button className="me-2 header-login-button">로그인</Button>
                      </Link>
                      <Link to="/signup">
                        <Button className="header-signup-button">회원가입</Button>
                      </Link>
                    </div>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
        
              {/* Footer */}
              <footer className="text-white py-4 mt-auto">
                <Container>
                  <Row>
                    <Col md={6}>
                      <img src="/images/logo-white.png" alt="Logo" style={{ width: '98px', height: '29px', marginBottom: '8px'}} />
                      <p className="mb-1">Copyright © 2025 Petco</p>
                      <p className="mb-0">All rights reserved</p>
                      <div className="mt-4">
                        <img src="/images/home-instagram-icon.png" alt="Instagram" className="me-2" style={{ width: '32px', height: '32px' }} />
                        <img src="/images/home-youtube-icon.png" alt="YouTube" style={{ width: '32px', height: '32px' }} />
                      </div>
                    </Col>
                    <Col md={6} className="text-end">
                      <p>(28644) 충북 청주시 서원구 충대로 1, 충북대학교</p>
                      <p>전자정보대학 소프트웨어학부 S4-1동 (전자정보 3관)</p>
                      <p>043-123-4567</p>
                      <p>petco@chungbuk.ac.kr</p>
                    </Col>
                  </Row>
                </Container>
              </footer>
            </div>
    );
}
export default Community;