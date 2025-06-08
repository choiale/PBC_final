import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/community.css';
import { Container, Button, ListGroup } from 'react-bootstrap';
import React, { useEffect, useState} from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

function Community() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const chartData = [
        {name: '강아지', count: 3},
        {name: '고양이', count: 2},
        {name: '소동물', count: 1},
        {name: '기타', count: 1},
    ];

    useEffect(() => {
        // fetch로 교체 필요
        import('../data/tempPosts').then(module => {
            setPosts(module.default);
        });
    }, []);
    
    const handleWrite = () => {
        navigate('/writePosts');
    };

    return (
        <div className="my-5">
            <Container>
                <p className="community-title">커뮤니티</p>

                {/* 차트 */}
                <div style={{ width: '80%', height: 300, margin: '30px auto' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" dy={10} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#4B49A5" barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* 글쓰기 버튼 */}
                <div className="co-button-container">
                    <Button className="co-button"onClick={handleWrite}>글쓰기</Button>
                </div>

                {/* 글 목록 */}
                <div className="posts-container">
                    {/* 개선 필요 */}
                    {posts.length > 0 && (
                        <ListGroup>
                            {posts.map(post => (
                                <ListGroup.Item
                                key={post.id}
                                action
                                onClick={() => navigate(`/posts/${post.id}`, { state: { post } })}
                                >
                                    [{post.animalKey}] {post.title}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default Community;