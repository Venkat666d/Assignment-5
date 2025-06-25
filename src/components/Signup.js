import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup({ toast }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(u => u.email === email);
    if (userExists) {
      toast.error('User already exists');
      return;
    }
    const newUser = { name, email, password, cart: [] };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    toast.success('Signup successful! Please login.');
    navigate('/');
  };

  return (
    <div className="container" style={{ maxWidth: 400, marginTop: 50 }}>
      <h2 className="text-center mb-4">Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
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
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
