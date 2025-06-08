import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/footer.css';

function Footer() {
    return (
        <div>
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
    )
}

export default Footer;