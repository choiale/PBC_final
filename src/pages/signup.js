import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login-signup.css';
import { Container, Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
    // 상태 관리 (이메일, 비밀번호, 닉네임)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault(); // form 제출 시 새로고침 방지

        // 회원가입 처리 로직 추가
        navigate('/'); // 회원가입 성공 -> 홈 화면으로 이동
    };

    return (
        <div className="my-5">
            <Container className="ls-all">
                <div className="ls-container-1 d-flex justify-content-center">
                    <p className="ls-title">회원가입</p>
                </div>

                <Form onSubmit={handleSubmit}>
                    {/* 이메일 입력 */}
                    <div className="d-flex justify-content-center">
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control
                                className="ls-input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>
                    </div>

                    {/* 비밀번호 입력 */}
                    <div className="d-flex justify-content-center">
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control
                                className="ls-input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                    </div>

                    {/* 닉네임 입력 */}
                    <div className="d-flex justify-content-center">
                        <Form.Group className="mb-4" controlId="formNickname">
                            <Form.Label>닉네임</Form.Label>
                            <Form.Control
                                className="ls-input"
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)} required />
                        </Form.Group>
                    </div>

                    {/* 회원가입 버튼 */}
                    <div className="ls-container-2 d-flex justify-content-center">
                        <Button type="submit" className="ls-button">회원가입</Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}

export default Signup;