import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import Home from './components/Home';
import Leads from './components/Leads';
import Projects from './components/Projects';
import CreateLeads from './components/CreateLead';
import Lead from './components/Lead';
import UpdateUser from './components/UpdateUser';
import AdminHome from './components/AdminHome';
import DeleteLead from './components/DeleteLead';

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
        <Route path="/leads/create" element={<CreateLeads />} />
        <Route path="/leads/lead/:leadId" element={<Lead />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/admin/update/user/:userId" element={<UpdateUser />} />
        <Route path="/admin/" element={<AdminHome />} />
        <Route path="/leads/delete/:leadId" element={<DeleteLead />} />
      </Routes>
    </div>
  );
}

export default App;
