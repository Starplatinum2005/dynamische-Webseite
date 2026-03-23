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
  const [bestellungen, setBestellungen] = useState<any[]>([]);
  const [loadingBestellungen, setLoadingBestellungen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserStr = localStorage.getItem('user');
    if (storedUserStr) {
      const userObj = JSON.parse(storedUserStr);
      setUser(userObj);
      setNeuerVorname(userObj.vorname);
      
      // Load user's orders
      loadBestellungen(userObj.id);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const loadBestellungen = async (userId: number) => {
    setLoadingBestellungen(true);
    try {
      const response = await fetch(`${API_BASE_URL}/bestellungen/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setBestellungen(data);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Bestellungen:', error);
    } finally {
      setLoadingBestellungen(false);
    }
  };

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
    <main className="login-container" style={{ maxWidth: '900px', margin: '50px auto', padding: '20px' }}>
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

      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Meine Bestellungen</h3>
        {loadingBestellungen ? (
          <p>Bestellungen werden geladen...</p>
        ) : bestellungen.length === 0 ? (
          <p style={{ color: '#7f8c8d' }}>Du hast noch keine Bestellungen getätigt.</p>
        ) : (
          <div>
            {bestellungen.map((bestellung, index) => {
              const bestellungNummer = bestellungen.length - index;
              return (
                <div key={index} style={{ 
                  background: '#fff', 
                  border: '1px solid #ddd', 
                  borderRadius: '6px', 
                  padding: '15px', 
                  marginBottom: '15px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h4>Bestellung #{bestellungNummer}</h4>
                    <span style={{ 
                      background: bestellung.Bestellstatus === 'bestätigt' ? '#2ecc71' : '#f39c12',
                      color: 'white',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      fontSize: '0.9rem'
                    }}>
                      {bestellung.Bestellstatus}
                    </span>
                  </div>

                  <p style={{ color: '#7f8c8d', marginBottom: '10px' }}>
                    Datum: {new Date(bestellung.Bestellungsdatum).toLocaleDateString('de-DE')}
                  </p>

                  {bestellung.produkte && bestellung.produkte.length > 0 && (
                    <div style={{ marginBottom: '10px' }}>
                      <strong>Produkte:</strong>
                      <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
                        {bestellung.produkte.map((produkt: any, idx: number) => (
                          <li key={idx}>
                            {produkt.Bezeichnung} - Menge: {produkt.Menge} x {produkt.Preis}€
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {bestellung.kurse && bestellung.kurse.length > 0 && (
                    <div>
                      <strong>Kurse:</strong>
                      <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
                        {bestellung.kurse.map((kurs: any, idx: number) => (
                          <li key={idx}>
                            {kurs.Titel} - Teilnehmer: {kurs.Anzahl_Teilnehmer} x {kurs.Preis}€
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '30px' }}>
        <button onClick={logout} style={{ background: '#3498db' }}>Ausloggen</button>
        <button onClick={handleDeleteAccount} style={{ background: '#e74c3c' }}>Account löschen</button>
      </div>
    </main>
  );
}