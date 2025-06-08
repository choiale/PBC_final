import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login-signup.css';
import { Container, Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    // 상태 관리 (이메일, 비밀번호)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault(); // form 제출 시 새로고침 방지

        // 로그인 처리 로직 추가
        navigate('/'); // 로그인인 성공 -> 홈 화면으로 이동

    };

    return (
        <div className="my-5">
            <Container className="ls-all">
                <div className="ls-container-1 d-flex justify-content-center">
                    <p className="ls-title">로그인</p>
                </div>

                <Form onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-center">
                        {/* 이메일 입력 */}
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control
                            className="ls-input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>
                    </div>

                    <div className="d-flex justify-content-center">
                    {/* 비밀번호 입력 */}
                        <Form.Group className="mb-4" controlId="formPassword">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control
                            className="ls-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                    </div>

                    <div className="ls-container-2 d-flex justify-content-center">
                    {/* 로그인 버튼 */}
                    <Button type="submit" className="ls-button">로그인</Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}

export default Login;