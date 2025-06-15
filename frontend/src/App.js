import './App.css';
import Header from './pages/header';
import Footer from './pages/footer';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Community from './pages/community';
import WritePosts from './pages/writePosts';
import PostDetail from './pages/postDetail';
import Adoption from './pages/adoption';
import Map from './pages/map';
import Mypage from './pages/mypage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/login" element = {<Login />} />
        <Route path="/signup" element = {<Signup />} />
        <Route path="/community" element = {<Community />} />
        <Route path="/writePosts" element = {<WritePosts/>} />
        <Route path="/posts/:id" element = {<PostDetail/>} />
        <Route path="/adoption" element = {<Adoption />} />
        <Route path="/map" element = {<Map />} />
        <Route path="/mypage" element = {<Mypage />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
