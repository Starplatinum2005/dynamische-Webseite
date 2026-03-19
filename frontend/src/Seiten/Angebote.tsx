/* alter Code zur Erinnerung
import './stylesheets/Angebote.css'
import { Boxen, Info} from '../Objects/Angebote';
import { Angebotsbox } from '../Komponente/Angebotsbox';
import { InfoBoxen } from '../Komponente/InfoBoxen';


export function Angebote (){
    return(
    <>
        <main>
        <section className="Anfangscontainer"> 
            <img className="Anfangsbild" src="/blickfang_angebote.jpg" alt="Unsere Angebote"/>
            <header className="Anfangstext">
                <h2>Aktuelle Tauchkurse und Angebote</h2>
            </header>
        </section>

        <section className="Angebote-Allgemeines">
            <InfoBoxen info={Info.Allgemeines} />
            <InfoBoxen info={Info.Kurs_Angebote} />
            <InfoBoxen info={Info.Logistik} />
            <InfoBoxen info={Info.Sicherheit} />
        </section>

        <span className="Tauch-Angebote" id="Kurse"> 
            <h1 className="Strich">{Boxen.Header}</h1>
        </span>

        <section className="Angebote-main" >
            <Angebotsbox angebot={Boxen.Schnuppertauchen} />
            <Angebotsbox angebot={Boxen.Delfintauchen} />
            <Angebotsbox angebot={Boxen.Korallentauchen} />
        </section>


        <section className="Angebote-main"> 
            <Angebotsbox angebot={Boxen.Tauchschein} />
            <Angebotsbox angebot={Boxen.Höhlentauchen} />
        </section>
        </main>
    </>
    )
}
*/

import { useEffect, useState } from 'react'; 
import './stylesheets/Angebote.css'
import { Info } from '../Objects/Angebote'; 
import { Angebotsbox } from '../Komponente/Angebotsbox';
import { InfoBoxen } from '../Komponente/InfoBoxen';


const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api'
    : '/api';
    
export function Angebote () {
    const [dbKurse, setDbKurse] = useState([]);

    useEffect(() => {

        fetch(`${API_BASE_URL}/kurse`)
            .then(res => res.json())
            .then(data => {
                console.log("Daten aus MariaDB:", data);
                setDbKurse(data);
            })
            .catch(err => console.error("Datenbank-Fehler:", err));
    }, []);

    return (
        <main>
            <section className="Anfangscontainer"> 
                <img className="Anfangsbild" src="/blickfang_angebote.jpg" alt="Unsere Angebote"/>
                <header className="Anfangstext">
                    <h2>Aktuelle Tauchkurse und Angebote</h2>
                </header>
            </section>

            <section className="Angebote-Allgemeines">
                <InfoBoxen info={Info.Allgemeines} />
                <InfoBoxen info={Info.Kurs_Angebote} />
                <InfoBoxen info={Info.Logistik} />
                <InfoBoxen info={Info.Sicherheit} />
            </section>

            <span className="Tauch-Angebote" id="Kurse"> 
                <h1 className="Strich">Unsere Kurse aus der Datenbank</h1>
            </span>

            <section className="Angebote-main">
                {dbKurse.map((kurs: any) => (
                    <Angebotsbox key={kurs.Kurs_ID} dbKurs={kurs} />
                ))}
            </section>
        </main>
    )
}