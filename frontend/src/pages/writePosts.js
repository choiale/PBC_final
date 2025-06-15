import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/writePosts.css';
import { Container, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WritePosts() {
    const [title, setTitle] = useState('');
    const [animalKey, setAnimalKey] = useState('');
    const [content, setContent] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            alert('글을 작성하려면 로그인이 필요합니다.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: `[${animalKey}] ${title}`,
                    content: content
                })
            });

            if (response.ok) {
                alert('게시글이 성공적으로 업로드되었습니다.');
                setTitle('');
                setAnimalKey('');
                setContent('');
                navigate('/community');
            } else {
                const data = await response.json();
                alert('게시글 업로드에 실패했습니다.: ' + (data.detail || 'Unknown error'));
            }
        } catch (error) {
            alert('게시글 업로드 에러 발생: ' + error.message);
        }
    };

    return (
        <Container className="my-5">
            <p className="write-title">게시글 작성</p>

            <Container className="write-all">
                <Form onSubmit={handleSubmit}>
                    <div>
                        <Form.Group className="mb-3">
                            <Form.Label className="write-label">제목</Form.Label>
                            <Form.Control
                                className="write-input-1"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </div>

                    <div>
                        <Form.Group className="mb-5">
                            <Form.Label className="write-label">동물 종류</Form.Label>
                            <Form.Control
                                className="write-input-1"
                                type="text"
                                placeholder="강아지 / 고양이 / 소동물 / 기타 중 하나를 입력하세요."
                                value={animalKey}
                                onChange={(e) => setAnimalKey(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </div>

                    <div>
                        <Form.Group className="mb-3">
                            <Form.Label className="write-label">내용</Form.Label>
                            <Form.Control
                                className="write-input-2"
                                as="textarea"
                                rows={5}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </div>

                    <div className="write-button-container d-flex justify-content-end">
                        <Button className="write-button" type="submit">게시글 등록</Button>
                    </div>
                </Form>
            </Container>
        </Container>
    );
}

export default WritePosts;
