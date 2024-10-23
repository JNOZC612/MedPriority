import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminMain from "./views/AdminMain";
import Login from "./views/Login";
import AdminDashBoard from "./views/AdminDashboard";
//import React, { useState } from 'react';
//import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
//import Dashboard from './dashboard';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminMain />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
/*const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      console.log('Login successful');
      setErrorMessage('');
      navigate('/dashboard');
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>MediPlus Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button type="submit">Login</button>
        </form>
      </header>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;*/
