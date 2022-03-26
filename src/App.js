import './App.css';
import axios from "axios";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import AuthService from './components/Auth';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import Home from './components/Home';
import Leads from './components/Leads';
import Projects from './components/Projects';

function App() {

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/auth/login" element={<Login />} />
        <Route path="/api/auth/signup" element={<Signup />} />
        <Route path="/api/auth/logout" element={<Logout />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </div>
  );
}

export default App;
