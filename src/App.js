import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Log from './pages/log'; // assuming this is your login component
import Community from './pages/community';
import Adopt from './pages/adopt';
import MapPage from './pages/map';
import MyPage from './pages/mypage';
import SignUp from './pages/signUp'; // adjust path as needed


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log" element={<Log />} />
        <Route path="/community" element={<Community />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/signUp" element={<SignUp/>}/>
      </Routes>
    </Router>
  );
}

export default App;
