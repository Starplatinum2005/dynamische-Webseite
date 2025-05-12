import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesheets/account.css';

export function Login() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem('username', username);
      navigate('/');
    }
  };

  return (
    <main className="login-container">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Benutzername"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Einloggen</button>
    </main>
  );
}
