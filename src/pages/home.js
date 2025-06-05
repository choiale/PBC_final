import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.css';
import { Navbar, Nav, Container, Row, Col, Button, Card } from 'react-bootstrap';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Link } from 'react-router-dom';


const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 36.625611,
  lng: 127.454489
};

function Home() {
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

      {/* Hero Section */}
      <div className="hero-wrapper mb-5">
      <Container className="text-left hero">
        <Row>
          <Col md={6}>
          <p className="hero-text">Welcome to <br /> <span style={{ color: '#6C70C5' }}>Petco</span></p>
            <p>청주시 반려인들과 자유롭게 소통하세요!</p>
            <Link to="/signup">
                <Button className="header-signup-button">가입하기</Button>
              </Link>
          </Col>
          <Col md={6}>
          <img src="/images/home-dog.png" alt='dog' style={{ width: 598, height: 301 }} />
          </Col>
        </Row>
      </Container>
      </div>

      {/* Features Section */}
      <Container className="pt-5 mb-5">
        <Row className="g-4 text-center">
          <Col md={4}>
            <Card className="shadow-sm feature-card">
              <Card.Img src="/images/home-smile-icon.png" alt="smile-icon" className="feature-card-icon" />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="feature-card-title">커뮤니티</Card.Title>
                <Card.Text className="feature-card-text">
                  강아지, 고양이뿐 아니라 소동물, 파충류,<br />수생동물, 조류 등 다양한 반려동물 이야기를<br />자유롭게 나누세요.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm feature-card">
              <Card.Img src="/images/home-cat-icon.png" alt="smile-icon" className="feature-card-icon" />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="feature-card-title">분양</Card.Title>
                <Card.Text className="feature-card-text">
                  보호소 분양부터 가정 분양까지,<br />다양한 분양 정보를 한눈에 확인해 보세요.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-200 shadow-sm feature-card">
              <Card.Img src="/images/home-map-icon.png" alt="smile-icon" className="feature-card-icon" />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="feature-card-title">동물 동반 지도</Card.Title>
                <Card.Text className="feature-card-text">
                  반려동물과 함께 방문할 수 있는 장소를<br />쉽게 찾아보세요.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Map Section */}
        <Container className="py-5 mb-5">
          <p className="map-text">찾아오시는 길</p>
          <LoadScript googleMapsApiKey="AIzaSyC80ncJFGXiB56rYOFG2YWELW8vwnD5li8">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={15}
            >
              <Marker position={center}
              icon="/images/pin-50.png"/>
            </GoogleMap>
          </LoadScript>
        </Container>


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

export default Home;
