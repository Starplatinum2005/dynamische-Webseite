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
      <head>
        <title> Blue Ocean dive - Startseite </title>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
    </head>
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