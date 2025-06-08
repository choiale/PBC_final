import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/mypage.css';
import { Container, Button, ListGroup } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import tempPosts from '../data/tempPosts';

function Mypage() {
    const currentUser = '사용자1'; // temp current user
    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        // 게시글 작성자 필터링
        const userPosts = tempPosts.filter(post => post.author === currentUser);
        setMyPosts(userPosts);
    }, []);

    const handleDelete = (id) => {
        const updatedPosts = myPosts.filter(post => post.id !== id);
        setMyPosts(updatedPosts);
    };

    return (
    <div className="my-5">
        <Container>
            <p className="mypage-title">게시글 관리</p>
            <div className="mypage-content-container">
                {myPosts.length === 0 ? (
                    <p>작성한 글이 없습니다.</p>
                ) : (
                    <ListGroup>
                        {myPosts.map(post => (
                            <ListGroup.Item key={post.id} className="d-flex justify-content-between align-items-center">
                                {post.title}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(post.id)}>삭제</Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </div>
        </Container>
    </div>
    );
}

export default Mypage;