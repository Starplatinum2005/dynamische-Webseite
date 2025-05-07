import { Angebotsboxen } from '../Objects/Angebote';
import './Angebotsbox.css'
import { useNavigate } from 'react-router-dom';

export function Angebotsbox({ angebot }: { angebot: Angebotsboxen }){
    const navigate = useNavigate();
    return(
        <>
            <article className="Angebote-Boxen">
                <img className="Boxen-Image" src= {angebot.src} alt="Höhlentauchen"/>
                <p>{angebot.Kurs}</p>
                <a className="Jetzt-buchen" aria-label="zur Seite buchen"><button onClick={() => navigate('/Buchung')}>Mehr dazu</button></a>
            </article>
        </>
    )
}