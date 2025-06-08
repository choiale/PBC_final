import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/header.css';

function Header() {
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
                        <Button as={Link} to="/login" className="me-2 header-login-button">로그인</Button>
                        <Button as={Link} to="/signup" className="header-signup-button">회원가입</Button>
                    </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;