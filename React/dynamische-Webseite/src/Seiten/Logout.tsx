import { useEffect, useState } from 'react';
import './stylesheets/Logout.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export function LoggedInPage() {
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    setUsername(storedUser);
  }, []);

    const logout = () => {
      localStorage.removeItem('username');
      localStorage.setItem('eingeloggt', 'false')
      setUsername(null);
      localStorage.removeItem('password')
      Swal.fire({
        title: 'Erfolgreich ausgeloggt!',
        text: 'Du wurdest erfolgreich ausgeloggt.',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      navigate('/');
    };

  return (
    <>
    <head>
        <title> Blue Ocean dive - Startseite </title>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
    </head>
    <main className="login-container">
      <h1>Sie sind eingeloggt</h1>
      <p>Willkommen, {username || 'Gast'}!</p>
      <button onClick={logout}>
        Ausloggen
      </button>
    </main>
    </>
  );
}
