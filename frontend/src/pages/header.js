import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import React, { useState, useEffect } from 'react';

function Header() {
    const [email, setEmail] = useState('');

    // 로그인한 사용자 정보(이메일) 불러오기
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setEmail(data.email);
                }
            } catch (error) {
                alert("유저 정보 조회 에러: ", error);
            }
        };

        fetchUserInfo();
    }, []);

    return (
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
                        <Nav.Link as={Link} to="/adoption">분양</Nav.Link>
                        <Nav.Link as={Link} to="/map">지도</Nav.Link>
                        <Nav.Link as={Link} to="/mypage">마이페이지</Nav.Link>
                    </Nav>
                    <div>
                        {email ? (
                            <span className="header-email-text">{email} 님</span>
                        ) : (
                            <>
                            <Button as={Link} to="/login" className="me-2 header-login-button">로그인</Button>
                            <Button as={Link} to="/signup" className="header-signup-button">회원가입</Button>
                            </>
                        )}
                    </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;