import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login-signup.css';
import { Container, Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('회원 가입에 성공했습니다.');
        navigate('/login');
      } else {
        alert('회원 가입에 실패했습니다.: ' + (data.detail || 'error'));
      }
    } catch (error) {
      alert('서버 연결 에러 발생: ' + error.message);
    }
  };

  return (
    <div className="my-5">
      <Container className="ls-all">
        <div className="ls-container-1 d-flex justify-content-center">
          <p className="ls-title">회원가입</p>
        </div>

        <Form onSubmit={handleSubmit}>
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

          <div className="d-flex justify-content-center">
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
            <Button type="submit" className="ls-button">가입하기</Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default Signup;
