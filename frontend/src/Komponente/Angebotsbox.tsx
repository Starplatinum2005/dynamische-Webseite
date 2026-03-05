/*import { Angebotsboxen } from '../Objects/Angebote';
import './Angebotsbox.css'
import { useNavigate } from 'react-router-dom';

export function Angebotsbox({ angebot }: { angebot: Angebotsboxen }){
    const navigate = useNavigate();
    return(
        <>
        <article className="Angebote-Boxen">
            <img className="Boxen-Image" src= {angebot.src} alt={angebot.alt}/>
            <p>{angebot.Kurs}</p>
            <a className="Jetzt-buchen" aria-label="zur Seite buchen"><button onClick={() => navigate('/Buchung')}>Mehr dazu</button></a>
        </article>
        </>
    )
}
*/

import './Angebotsbox.css'
import { useNavigate } from 'react-router-dom';

export function Angebotsbox({ dbKurs }: { dbKurs: any }) {
    const navigate = useNavigate();
    
    const imageSrc = dbKurs.Titel.includes('Datenbanken') 
        ? '/blickfang_angebote.jpg'
        : '/blickfang_angebote.jpg'; 

    return(
        <article className="Angebote-Boxen">
            <img className="Boxen-Image" src={imageSrc} alt={dbKurs.Titel}/>
            <p><strong>{dbKurs.Titel}</strong></p>
            <p style={{ margin: "0 0 10px 0", color: "#555" }}>Preis: {dbKurs.Preis} €</p>
            
            <a className="Jetzt-buchen" aria-label="zur Seite buchen">
                <button onClick={() => navigate('/Buchung')}>Mehr dazu</button>
            </a>
        </article>
    )
}