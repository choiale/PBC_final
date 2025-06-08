import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/writePosts.css';
import { Container, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WritePosts() {
    const [title, setTitle] = useState('');
    const [animalKey, setAnimalKey] = useState(''); // 무슨 동물에 관한 글인지 (말머리)
    const [content, setContent] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newPost = {
            id: Date.now(), // 임시 아이디
            title: `[${animalKey}] ${title}`,
            author: '임시 사용자', // 로그인 정보로 대체 필요
            content,
        };

        // 수정 필요
        alert('게시글 업로드 완료');
        setTitle('');
        setAnimalKey('');
        setContent('');

        navigate('/community');
    };

    return (
        <Container className="my-5">
            <p className="write-title">게시글 작성</p>
            
            <Container className="write-all">
                <Form onSubmit={handleSubmit}>

                    {/* 제목 작성 */}
                    <div>
                        <Form.Group className="mb-3">
                            <Form.Label className="write-label">제목</Form.Label>
                            <Form.Control
                                className="write-input-1"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                    </div>

                    {/* 동물 종류 작성 */}
                    <div>
                        <Form.Group className="mb-5">
                            <Form.Label className="write-label">동물 종류</Form.Label>
                            <Form.Control
                                className="write-input-1"
                                type="text"
                                placeholder="강아지 / 고양이 / 소동물 / 기타 중 하나를 선택해서 입력하세요."
                                value={animalKey}
                                onChange={(e) => setAnimalKey(e.target.value)}
                            />
                        </Form.Group>
                    </div> 

                    {/* 게시글 내용 작성 */}
                    <div>
                        <Form.Group className="mb-3">
                            <Form.Label className="write-label">내용</Form.Label>
                            <Form.Control
                                className="write-input-2"
                                as="textarea"
                                rows={5}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                    </div>

                    {/* 게시글 등록 버튼 */}
                    <div className="write-button-container d-flex justify-content-end">
                        <Button className="photo-button">사진 등록</Button> 
                        <Button className="write-button" type="submit">게시글 등록</Button>
                    </div>
                </Form>
            </Container>
        </Container>
    );
}

export default WritePosts;