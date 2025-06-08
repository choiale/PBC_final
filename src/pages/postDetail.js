import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/postDetail.css';
import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Container, Button, Form, ListGroup } from 'react-bootstrap';
import TempPosts from '../data/tempPosts';

function PostDetail() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [comments, setComments] = useState([]); // 댓글 상태 [{id, author, text}]
    const [newComment, setNewComment] = useState(''); // 새 댓글 상태

    const post = location.state?.post;

    if (!post) {
        return <div>게시글을 찾을 수 없습니다.</div>;
    }

    // 댓글 추가하는 함수
    const handleAddComment = () => {
        const commentToAdd = {
            id: Date.now(), // 임시 아이디
            author: '사용자 1', // 임시 작성자
            text: newComment.trim(),
        };

        setComments(prev => [...prev, commentToAdd]);
        setNewComment(''); // 입력창 초기화
    }

    return (
        <Container className="my-5">
            <div className="post-detail-container">
                {/* 게시글 보기 */}
                <p className="pd-title">제목: {post.title}</p>
                <hr />
                <p className="pd-title">작성자: {post.author}</p>
                <hr />
                <p>{post.content}</p>
            </div>

            {/* 댓글 리스트 보기 */}
            <div className="comment-detail-container">
                <p className="pd-title">댓글 목록</p>
                <hr />
                {comments.length === 0 ? (
                    <p>댓글이 없습니다.</p>
                ) : (
                    <ListGroup>
                        {comments.map(comment => (
                            <ListGroup.Item key={comment.id}>
                                <p>{comment.author}: {comment.text}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}

            {/* 댓글 입력 form */}
            <hr />
            <Form className="mt-3" onSubmit={e => {
                e.preventDefault();
                handleAddComment();
            }}>
                <Form.Group controlId="commentInput">
                    <Form.Control
                        type="text"
                        placeholder="댓글을 입력하세요."
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                    />
                </Form.Group>

                {/* 댓글 등록 버튼 */}
                <div className="comment-button-container d-flex justify-content-end">
                    <Button className="comment-button" type="submit">댓글 등록</Button>
                </div>
            </Form>

            </div>

            {/* 뒤로가기 버튼 */}
            <div className="back-button-container d-flex justify-content-end">
                <Button className="back-button" onClick={() => navigate(-1)}>뒤로가기</Button>
            </div>
        </Container>
    );
}

export default PostDetail;