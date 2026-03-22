import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesheets/account.css';
import Swal from 'sweetalert2';

const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api'
    : '/api';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email.trim() && password.trim()) {
      try {
        const response = await fetch(`${API_BASE_URL}/benutzer/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, passwort: password })
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('user', JSON.stringify(data.user));
          
          Swal.fire({
            title: `Willkommen zurück, ${data.user.vorname}!`,
            icon: 'success',
            confirmButtonText: 'OK'
          });
          navigate('/');
        } else {
          Swal.fire({
            title: 'Fehler!',
            text: data.error || 'Login fehlgeschlagen',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      } catch (error) {
        console.error("Login-Fehler:", error);
      }
    } else {
      Swal.fire({ title: 'Fehler!', text: 'Bitte E-Mail und Passwort eingeben.', icon: 'error' });
    }
  };

  const handleSupport = () => navigate('/kontakt');

  return (
    <main className="login">
      <div className="login-container">
        <h1>Login</h1>
        <input
          type="email"
          placeholder="E-Mail Adresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button onClick={handleLogin}>Einloggen</button>
      </div>
      <div className="support-box">
        <p>Noch keinen Account?</p>
        <button className="support-button" onClick={() => navigate('/registrieren')}>Jetzt registrieren</button>
      </div>
    </main>
  );
}