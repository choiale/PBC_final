import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/postDetail.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Form, ListGroup } from 'react-bootstrap';

function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const token = localStorage.getItem('token');

    // 게시글 불러오기
    useEffect(() => {
        if (!id) return;

        fetch(`http://127.0.0.1:8000/posts/${id}`)
            .then(res => res.json())
            .then(data => setPost(data))
            .catch(err => console.error(err));
    }, [id]);

    // 댓글 불러오기
    useEffect(() => {
        if (!id) return;

        fetch(`http://127.0.0.1:8000/comments?post_id=${id}`)
            .then(res => res.json())
            .then(data => setComments(data))
            .catch(err => console.error(err));
    }, [id]);

    // 댓글 추가
    const handleAddComment = async () => {
        if (!token) {
            alert('댓글을 작성하려면 로그인이 필요합니다.');
            return;
        }

        if (!newComment.trim()) {
            alert('댓글을 입력해주세요.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    post_id: parseInt(id),
                    content: newComment.trim()
                })
            });

            if (response.ok) {
                const newOne = await response.json();
                setComments(prev => [...prev, newOne]);
                setNewComment('');
            } else {
                const data = await response.json();
                alert('댓글 작성에 실패했습니다.: ' + (data.detail || 'Unknown error'));
            }
        } catch (err) {
            alert('에러 발생: ' + err.message);
        }
    };

    return (
        <Container className="my-5">
            {/* 게시글 정보 */}
            {post ? (
                <div className="post-detail-container">
                    <p className="pd-title">제목: {post.title}</p>
                    <hr />
                    <p className="pd-title">작성자: {post.author_email}</p>
                    <hr />
                    <p>{post.content}</p>
                </div>
            ) : (
                <div>게시글을 불러오는 중입니다...</div>
            )}

            {/* 댓글 보기 */}
            <div className="comment-detail-container mt-4">
                <p className="pd-title">댓글 목록</p>
                <hr />
                {comments.length === 0 ? (
                    <p>댓글이 없습니다.</p>
                ) : (
                    <ListGroup>
                        {comments.map(comment => (
                            <ListGroup.Item key={comment.id}>
                                <p>{comment.author_email}: {comment.content}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}

                {/* 댓글 등록 form */}
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
                    <div className="comment-button-container d-flex justify-content-end mt-2">
                        <Button className="comment-button" type="submit">댓글 등록</Button>
                    </div>
                </Form>
            </div>

            {/* 뒤로가기 */}
            <div className="back-button-container d-flex justify-content-end mt-4">
                <Button className="back-button" onClick={() => navigate(-1)}>뒤로가기</Button>
            </div>
        </Container>
    );
}

export default PostDetail;
