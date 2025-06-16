import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesheets/account.css';
import Swal from 'sweetalert2';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      if (password.length < 8) {
        Swal.fire({
          title: 'Fehler!',
          text: 'Das Passwort muss mindestens 8 Zeichen lang sein.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }
      localStorage.setItem('username', username);
      localStorage.setItem('eingeloggt', 'true');
      localStorage.setItem('password', password);
      Swal.fire({
        title: 'Erfolgreich eingeloggt!',
        text: 'Du wurdest erfolgreich eingeloggt.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/');
    } else {
      Swal.fire({
        title: 'Fehler!',
        text: 'Bitte Benutzername und Passwort eingeben.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleSupport = () => {
    navigate('/kontakt');
  };

  return (
    <main className="login-page">
      <div className="login-container">
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
      </div>

      <div className="support-box">
        <p>Haben Sie Probleme beim Einloggen?</p>
        <button className="support-button" onClick={handleSupport}>
          Kontaktieren Sie uns
        </button>
      </div>
    </main>
  );
}
