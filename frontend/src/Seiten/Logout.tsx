import { useEffect, useState } from 'react';
import './stylesheets/Logout.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api'
    : '/api';

export function LoggedInPage() {
  const [user, setUser] = useState<any>(null);
  const [neuerVorname, setNeuerVorname] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserStr = localStorage.getItem('user');
    if (storedUserStr) {
      const userObj = JSON.parse(storedUserStr);
      setUser(userObj);
      setNeuerVorname(userObj.vorname);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    Swal.fire({ title: 'Ausgeloggt!', text: 'Bis bald.', icon: 'success' });
    navigate('/');
  };

  const handleUpdate = async () => {
    if (!neuerVorname.trim()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/benutzer/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          Vorname: neuerVorname,
          Nachname: user.nachname,
          Email: user.email,
          Passwort: user.passwort
        })
      });

      if (response.ok) {
        const updatedUser = { ...user, vorname: neuerVorname };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        
        Swal.fire('Erfolg!', 'Dein Vorname wurde aktualisiert.', 'success');
      } else {
        Swal.fire('Fehler', 'Konnte nicht aktualisiert werden.', 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: 'Bist du sicher?',
      text: "Dein Account wird unwiderruflich gelöscht!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ja, Account löschen!',
      cancelButtonText: 'Abbrechen'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API_BASE_URL}/benutzer/${user.id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          Swal.fire('Gelöscht!', 'Dein Account wurde entfernt.', 'success');
          localStorage.removeItem('user');
          navigate('/');
        } else {
          Swal.fire('Fehler', 'Dein Account konnte nicht gelöscht werden.', 'error');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!user) return null;

  return (
    <main className="login-container" style={{ maxWidth: '600px', margin: '50px auto' }}>
      <h1>Mein Profil</h1>
      <p style={{ marginBottom: '30px' }}>Willkommen zurück, <strong>{user.vorname} {user.nachname}</strong>!</p>
      
      <div style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Profil bearbeiten</h3>
        <label style={{ display: 'block', marginBottom: '5px' }}>Vorname ändern:</label>
        <input 
          type="text" 
          value={neuerVorname} 
          onChange={(e) => setNeuerVorname(e.target.value)} 
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button onClick={handleUpdate} style={{ background: '#2ecc71' }}>Änderungen speichern</button>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '30px' }}>
        <button onClick={logout} style={{ background: '#3498db' }}>Ausloggen</button>
        <button onClick={handleDeleteAccount} style={{ background: '#e74c3c' }}>Account löschen</button>
      </div>
    </main>
  );
}