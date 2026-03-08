import { useEffect, useState } from 'react';
import './stylesheets/buchung.css';
import { Buchungsbox } from '../Komponente/Buchungbox';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export function Buchung () {
    const navigate = useNavigate();
    const [dbKurse, setDbKurse] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/api/kurse')
            .then(res => res.json())
            .then(data => setDbKurse(data))
            .catch(err => console.error("Fehler beim Laden der Kurse:", err));
    }, []);
    const handleBezahlen = async (formData: FormData) => {
        if (localStorage.getItem('eingeloggt') === 'true') {
            const anzahlTeilnehmer = parseInt(formData.get('erwachsene') as string) + parseInt(formData.get('kinder') as string);
            const kursId = formData.get('kurs');

            try {
                const response = await fetch('http://localhost:3000/api/bestellungen', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        User_ID: 2,
                        Kurs_ID: kursId,
                        Anzahl_Teilnehmer: anzahlTeilnehmer,
                        Status: 'In Bearbeitung'
                    })
                });

                if (response.ok) {
                    Swal.fire({
                        title: 'Vielen Dank für Ihre Buchung!',
                        text: 'Die Daten wurden erfolgreich in der Datenbank gespeichert.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    navigate('/');
                } else {
                    throw new Error('Fehler beim Speichern in der Datenbank');
                }
            } catch (error) {
                Swal.fire('Fehler', 'Konnte nicht gebucht werden.', 'error');
                console.error(error);
            }

        } else {
            Swal.fire({
                title: 'Rabattcode verfügbar!',
                text: 'Melde dich an um 10% Rabatt auf diesen Einkauf zu erhalten',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Einloggen',
                cancelButtonText: 'Nein danke'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    navigate('/');
                    Swal.fire({ title: 'Vielen Dank für Ihren Einkauf!', icon: 'success' });
                }
            });
        }
    }

    return (
        <main className="buchung_main">
            <div className="kurs-container">  
                <div className="kurs-info">
                    <h2>Warnung</h2>
                    <p>Bei dieser Website handelt es sich um ein studentisches Projekt</p>
                </div>
            </div>

            {dbKurse.map((kurs: any) => (
                <Buchungsbox key={kurs.Kurs_ID} dbKurs={kurs} />
            ))}

            <section className="Buchungs-Formular" id="Test">
                <h1 className="Strich">Buchen Sie Ihren Tauchkurs</h1>
                
                <form className="Formular" onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    if (form.checkValidity()) {
                        const formData = new FormData(form);
                        handleBezahlen(formData);
                    } else {
                        form.reportValidity();
                    }
                }}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required placeholder="Max Mustermann" /><br />

                    <label htmlFor="email">E-Mail Adresse:</label>
                    <input type="email" id="email" name="email" required placeholder="max123@gmail.com" /><br />

                    <label htmlFor="erwachsene">Anzahl Erwachsene</label>
                    <input type="number" id="erwachsene" name="erwachsene" defaultValue="1" min="0" required /><br />

                    <label htmlFor="kinder">Anzahl Kinder</label>
                    <input type="number" id="kinder" name="kinder" defaultValue="0" min="0" required /><br />

                    <label htmlFor="kurs">Wählen Sie Ihren Kurs</label>
                    <select id="kurs" name="kurs" required>
                        {dbKurse.map((kurs: any) => (
                            <option key={kurs.Kurs_ID} value={kurs.Kurs_ID}>
                                {kurs.Titel} ({kurs.Preis} €)
                            </option>
                        ))}
                    </select><br/>

                    <label htmlFor="datum">Wunschdatum</label>
                    <input type="date" id="datum" name="datum" required /><br/>

                    <label htmlFor="nachricht">Anmerkungen und Wünsche:</label>
                    <textarea id="nachricht" name="nachricht" placeholder="Ihre Nachricht"></textarea><br/>

                    <button type="submit">Tauchkurs buchen</button>
                </form>
            </section>
        </main>
    )
}

/*
import './stylesheets/buchung.css'
import { BuchungInfo} from '../Objects/Buchung'
import { Buchungsbox } from '../Komponente/Buchungbox'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export function Buchung (){
      const navigate = useNavigate();
      const handleBezahlen = () => {
        if (localStorage.getItem('eingeloggt') === 'true') {
          Swal.fire({
          title: 'Vielen Dank für Ihren Einkauf!',
          icon: 'success',
          confirmButtonText: 'OK'
          });
          navigate('/');
        } else {
          Swal.fire({
            title: 'Rabattcode verfügabr!',
            text: 'Melde dich an um 10% Rabatt auf diesen Einkauf zu erhalten',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Einloggen',
            cancelButtonText: 'Nein danke, ich bin zurückgeblieben!'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/login');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            navigate('/');
            Swal.fire({
              title: 'Vielen Dank für Ihren Einkauf!',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            }
          });
        };
      }
    return (
    <>
        <main className="buchung_main">
    
        <div className="kurs-container">  
            <div className="kurs-info">
                <h2>Warnung</h2>
                <p>Bei dieser Website handelt es sich um ein studentisches Projekt</p>
            </div>
        </div>

        <Buchungsbox Kurse={BuchungInfo.Schnuppertauchen} />
        <Buchungsbox Kurse={BuchungInfo.Delfintauchen} />
        <Buchungsbox Kurse={BuchungInfo.Korallentauchen} />
        <Buchungsbox Kurse={BuchungInfo.Tauchschein} />
        <Buchungsbox Kurse={BuchungInfo.Höhlentauchen} />

        <section className="Buchungs-Formular" id="Test">

            <h1 className="Strich">Buchen Sie Ihren Tauchkurs</h1>
                <form className="Formular" onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    if (form.checkValidity()) {
                        handleBezahlen();
                    } else {
                        form.reportValidity();
                    }
                }}>
                <label htmlFor="name">Name:</label>
                <input type="text"  id="name" required placeholder="Max Mustermann" /><br />

                <label htmlFor="email">E-Mail Adresse:</label>
                <input type="email"  id="email" required placeholder="max123@gmail.com" /><br />

                <label htmlFor="number">Anzahl Erwachsene</label>
                <input type="number" id="number" required /><br />

                <label htmlFor="Anzahl">Anzahl Kinder</label>
                <input type="number" id="Anzahl" required /><br />

                <label htmlFor="kurs">Wählen Sie Ihren Kurs</label>
                <select id="kurs" required >
                    <option >Schnuppertauchen (60€ p.P.)</option>
                    <option>Delfintauchen (110€ p.P.)</option>
                    <option>Korallentauchen (80€ p. P.)</option>
                    <option>Tauchschein (300€ p.P.)</option>
                    <option>Höhlentauchen (130€ p.P.)</option>
                </select><br/>

                <label htmlFor="datum">Datum</label>
                <input type="date" id="datum" required /><br/>

                <label htmlFor="nachricht">Anmerkungen und Wünsche:</label>
                <textarea id="nachricht" placeholder="Ihre Nachricht"></textarea><br/>

                <button type="submit">Tauchkurs buchen</button>
            </form>
        </section>
        </main>
    </>
    )
}
*/