import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Navbar, Nav } from 'react-bootstrap';
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { Link } from 'react-router-dom';


function SignUp() {
  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
      {/* Sign-Up Form */}
      <Container className="flex-grow-1 d-flex justify-content-center align-items-center">
        <Row className="w-100 justify-content-center mt-5">
          <Col xs={12} md={6} lg={4}>
            <h2 className="text-center mb-4 fw-bold">회원가입</h2> {/* changed heading */}
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control
                    type="email"
                    placeholder="이메일을 입력하세요"
                    style={{ backgroundColor: '#f1f2f7' }}
                    />
                </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>닉네임</Form.Label>
                <Form.Control
                  type="text"  // fixed type
                  placeholder="닉네임을 입력하세요"
                  style={{ backgroundColor: '#f1f2f7' }}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                  type="password"  // fixed type
                  placeholder="비밀번호를 입력하세요"
                  style={{ backgroundColor: '#f1f2f7' }}
                />
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" style={{ backgroundColor: '#a99dd8', border: 'none' }}>가입하기</Button> {/* changed button text */}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer style={{ backgroundColor: '#a99dd8' }} className="text-white py-4 mt-auto">
        <Container>
          <Row>
            <Col md={6}>
              <h5>🐾 Petco</h5>
              <p className="mb-1">Copyright © 2025 Petco</p>
              <p className="mb-0">All rights reserved</p>
              <div className="mt-2">
                
              </div>
            </Col>
            <Col md={6} className="text-end">
              <p>(28644) 충북 청주시 서원구 충대로 1, 충북대학교</p>
              <p>전자정보대학 소프트웨어학과 S4-1동 518호 (반려정보 공간)</p>
              <p>043-123-4567</p>
              <p>petco@chungbuk.ac.kr</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default SignUp;

