import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ toast }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      toast.success(`Welcome, ${user.name}!`);
      navigate('/home');
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 400, marginTop: 50 }}>
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
