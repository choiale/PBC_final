import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
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
      {/* Hero Section */}
      <div className="hero-wrapper mb-5">
      <Container className="text-left hero">
        <Row>
          <Col md={6}>
          <p className="hero-text">Welcome to <br /> <span style={{ color: '#6C70C5' }}>Petco</span></p>
            <p>청주시 반려인들과 자유롭게 소통하세요!</p>
            <Button as={Link} to="/community" className="hero-button" size="lg">
            커뮤니티
            <img
              className="hero-button-icon"
              src="/images/white-paw.png"
              alt="paw icon"
              />
            </Button>
          </Col>
          <Col md={6}>
          <img src="/images/home-dog.png" style={{ width: 598, height: 301 }} />
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
    </div>
  );
}

export default Home;
