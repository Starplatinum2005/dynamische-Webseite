import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesheets/account.css';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      if (password.length < 8) {
        alert('Das Passwort muss mindestens 8 Zeichen lang sein.');
        return;
      }
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      navigate('/');
    } else {
      alert('Bitte Benutzername und Passwort eingeben.');
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
        required
      />
      <input
        type="password"
        placeholder="Passwort (min. 8 Zeichen)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
/>

      <button onClick={handleLogin}>Einloggen</button>
    </main>
  );
}
