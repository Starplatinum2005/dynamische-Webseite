import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesheets/Registrierung.css';
import Swal from 'sweetalert2';

const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api'
    : '/api';

export function Registrierung() {
  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    strasse: '',
    plz: '',
    ort: '',
    email: '',
    passwort: '',
    passwortWiederholen: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.vorname.trim() || !formData.nachname.trim() || !formData.email.trim() || !formData.passwort.trim()) {
      Swal.fire({
        title: 'Fehler!',
        text: 'Bitte füllen Sie mindestens Name, E-Mail und Passwort aus.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Swal.fire({
        title: 'Fehler!',
        text: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return false;
    }

    if (formData.passwort.length < 6) {
      Swal.fire({
        title: 'Fehler!',
        text: 'Das Passwort muss mindestens 6 Zeichen lang sein.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return false;
    }

    if (formData.passwort !== formData.passwortWiederholen) {
      Swal.fire({
        title: 'Fehler!',
        text: 'Die Passwörter stimmen nicht überein.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/benutzer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Vorname: formData.vorname,
          Nachname: formData.nachname,
          Strasse: formData.strasse,
          PLZ: formData.plz,
          Ort: formData.ort,
          Email: formData.email,
          Passwort: formData.passwort,
          Rollennummer: 2 //USer
        })
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: 'Erfolg!',
          text: 'Ihr Account wurde erfolgreich erstellt. Sie werden zum Login weitergeleitet.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/login');
        });
      } else {
        Swal.fire({
          title: 'Fehler!',
          text: data.error || 'Registrierung fehlgeschlagen',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error("Registrierungs-Fehler:", error);
      Swal.fire({
        title: 'Fehler!',
        text: 'Ein Fehler beim Registrieren ist aufgetreten.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleBackToLogin = () => navigate('/login');

  return (
    <main className="registrierung">
      <div className="registrierung-container">
        <h1>Registrierung</h1>
        
        <div className="form-row">
          <input
            type="text"
            name="vorname"
            placeholder="Vorname"
            value={formData.vorname}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="nachname"
            placeholder="Nachname"
            value={formData.nachname}
            onChange={handleInputChange}
            required
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="E-Mail Adresse"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <input
          type="text"
          name="strasse"
          placeholder="Straße (Optional)"
          value={formData.strasse}
          onChange={handleInputChange}
        />

        <div className="form-row">
          <input
            type="text"
            name="plz"
            placeholder="PLZ (Optional)"
            value={formData.plz}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="ort"
            placeholder="Ort (Optional)"
            value={formData.ort}
            onChange={handleInputChange}
          />
        </div>

        <input
          type="password"
          name="passwort"
          placeholder="Passwort"
          value={formData.passwort}
          onChange={handleInputChange}
          required
        />

        <input
          type="password"
          name="passwortWiederholen"
          placeholder="Passwort wiederholen"
          value={formData.passwortWiederholen}
          onChange={handleInputChange}
          required
        />

        <button onClick={handleRegister} className="register-btn">Jetzt registrieren</button>
      </div>

      <div className="support-box">
        <p>Haben Sie bereits einen Account?</p>
        <button className="support-button" onClick={handleBackToLogin}>Zum Login</button>
      </div>
    </main>
  );
}
