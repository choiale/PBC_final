import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/community.css';
import { Container, Button, ListGroup } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

function Community() {
    const [posts, setPosts] = useState([]);
    const [chart, setChart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://127.0.0.1:8000/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data);

                // Count by category extracted from title
                const countByType = {
                    '강아지': 0,
                    '고양이': 0,
                    '소동물': 0,
                    '기타': 0
                };

                data.forEach(post => {
                    const key = post.title.match(/\[(.*?)\]/)?.[1]; // extract label in []
                    if (key && countByType.hasOwnProperty(key)) {
                        countByType[key]++;
                    } else {
                        countByType['기타']++;
                    }
                });

                // Prepare chart data
                const updatedChartData = [
                    { name: '강아지', count: countByType['강아지'] },
                    { name: '고양이', count: countByType['고양이'] },
                    { name: '소동물', count: countByType['소동물'] },
                    { name: '기타', count: countByType['기타'] }
                ];

                setChart(updatedChartData);
            })
            .catch(err => console.error('Fetch error:', err));
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
                        <BarChart data={chart}>
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
                    <Button className="co-button" onClick={handleWrite}>글쓰기</Button>
                </div>

                {/* 글 목록 */}
                <div className="posts-container">
                    {posts.length > 0 && (
                        <ListGroup>
                            {posts.map(post => (
                                <ListGroup.Item
                                    key={post.id}
                                    action
                                    onClick={() => navigate(`/posts/${post.id}`, { state: { post } })}
                                >
                                    {post.title}
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
