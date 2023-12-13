import React, { useState } from 'react';
import '../login/login.scss'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form submission
    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("https://localhost:7249/api/LoginAdmin/login", userData);
      const accessToken = response.data.token;

      // Lưu accessToken vào localStorage
      localStorage.setItem('accessToken', accessToken);

      // Chuyển hướng đến trang chính
      navigate('/home');
      setMessage("Login successful!");
      
    } catch (error) {
      console.error('Error:', error);
      setMessage("Wrong email or password.");
    }
  };

  return (
    <div className="login-container">
        <div className="login-form">
          <h2>Login</h2>
          {message && <p className="message">{message}</p>} 
          <form>
            <div className="form-group">
              <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email "  
            />
            
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  
              placeholder="Enter your password"
            />
          </div>
          <button onClick={handleLogin}>Login</button> 
        </form>
      </div>
    </div>
  );
}

export default Login;
