import { Link } from 'react-router-dom'
import './footer.css'

export function Footer(){
    return(
    <>
        <footer className="footer">
            <section className="gridcontainer">
            <section className="ersteSpalte">
                <p>Öffnungszeiten</p>
                <p>Sommersaison:</p>
                <p>Mo.: Ruhetag</p>
                <p>Di. - Fr.: 12:00 - 20:00</p>
                <p>Sa. und So.: 10:00 - 20:00</p>
            </section>
            <section className="zweiteSpalte">
                <p><Link to="/Impressum" aria-label="Link zum Impressum">Impressum</Link></p>
                <p><Link to="/Datenschutz" aria-label="Link zum Datenschutz">Datenschutz</Link></p>
                <p><Link to="/uberuns" aria-label="Link zur Seite Über uns ">Über uns</Link></p>
                <p><Link to="/Kontakt" aria-label="Link zur Kontaktseite">Kontakt</Link></p>
                <p><Link to="/FAQ" aria-label="Link zum FAQ">FAQ</Link></p>
           </section>
           <section className="dritteSpalte">
               <p>Folgen Sie uns auf:</p>
               <section className="social-icons">
                    <a href="https://instagram.com" aria-label="Link zu Instagram" className="icon-container">
                        <img src="/Instagram Logo.webp" alt="Instagram Logo" className="icon-image"/>
                        <span>Instagram</span>
                    </a>
                    <a href="https://facebook.com" aria-label="Link zu Facebook" className="icon-container">
                        <img src="/Facebook Logo 2.webp" alt="Facebook Logo" className="icon-image"/>
                        <span>Facebook</span>
                    </a>
                </section>
            </section>
        </section>
    </footer>   
    </>
    )
};