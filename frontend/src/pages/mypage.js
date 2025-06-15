import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/mypage.css';
import { Container, Button, ListGroup } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Mypage() {
    const [myPosts, setMyPosts] = useState([]);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const fetchMyPosts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/me/posts', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setMyPosts(data);
                } else {
                    alert('작성한 게시글 조회에 실패했습니다.');
                }
            } catch (error) {
                alert('작성한 게시글 조회 에러 발생: ' + error.message);
            }
        };

        // 추가 - 로그인한 유저 정보(이메일) 가져오는 함수
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/me', {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setEmail(data.email);
                }
                else {
                    alert('유저 정보 조회에 실패했습니다.');
                }
            }
            catch (error) {
                alert('유저 정보 조회 에러 발생: ' + error.message);
            }
        }

        fetchMyPosts();
        fetchUserInfo();
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch(`http://127.0.0.1:8000/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setMyPosts(prev => prev.filter(post => post.id !== id));
            } else {
                alert('게시글 삭제에 실패했습니다.');
            }
        } catch (error) {
            alert('게시글 삭제 에러 발생: ' + error.message);
        }
    };

    // 로그아웃 함수
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload(); // 로그아웃 -> 메인 페이지로 이동
    }

    return (
        <div className="my-5">
            <Container>
                <p className="mypage-title">게시글 관리</p>
                <p className="mypage-text"><strong className="my-email-text">{email}</strong> 님, 안녕하세요!</p>
                <div className="mypage-content-container">
                    {myPosts.length === 0 ? (
                        <p>작성한 게시글이 없습니다.</p>
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

                    {/* 로그아웃 버튼 */}
                    <div className="write-button-container d-flex justify-content-end">
                        <Button className="my-logout-button" onClick={handleLogout}>로그아웃</Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Mypage;
