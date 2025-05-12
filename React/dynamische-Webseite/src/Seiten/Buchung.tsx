import './stylesheets/buchung.css'
import { BuchungInfo} from '../Objects/Buchung'
import { Buchungsbox } from '../Komponente/Buchungbox'

export function Buchung (){
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
            <form className="Formular">
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