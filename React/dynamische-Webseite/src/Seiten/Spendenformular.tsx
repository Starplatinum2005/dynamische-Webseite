import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesheets/Spendenformular.css';

export const Spendenformularseite = () => {
  const [betrag, setBetrag] = useState<number | ''>();
  const [dankmeldung, setdankMeldung] = useState('');
  const [fehlermeldung, setfehlerMeldung] = useState('');
  const navigate = useNavigate();

  const check = () => {
    const zahl = typeof betrag === 'string' ? Number(betrag) : betrag;

    if (!zahl || zahl <= 0) {
      setfehlerMeldung(`Bitte gib einen gültigen Betrag ein.`);
      setdankMeldung('');
      return;
    }

    setfehlerMeldung('');
    setdankMeldung(`Vielen Dank für deine Spende von ${zahl}€!`);

    setTimeout(() => {
      navigate('/');
    }, 2800);
  };

  const handleSupportClick = () => {
    navigate('/kontakt');
  };

  return (
    <div className="spendenformularseite">
      <div className="spendenformular">
        <h1>Spendenformular</h1>
        <p>Hilf mit! Jeder Beitrag zählt.</p>
        <input
          type="number"
          placeholder="Betrag in €"
          step="0.1"
          value={betrag}
          onChange={(e) =>
            setBetrag(e.target.value === '' ? '' : Number(e.target.value))
          }
        />
        {fehlermeldung && <p className="fehlermeldung">{fehlermeldung}</p>}
        <button className="spendenformularbutton" onClick={check}>
          Jetzt spenden
        </button>
        {dankmeldung && <p className="dankmeldung">{dankmeldung}</p>}
      </div>

      <div className="support-box">
        <p>Wenn es Probleme gibt, kontaktieren Sie bitte unseren Support.</p>
        <button className="support-button" onClick={handleSupportClick}>
          Support kontaktieren
        </button>
      </div>
    </div>
  );
};
