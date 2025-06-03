import { Link } from 'react-router-dom'
import './footer.css'

type Footerprops = {
    t: (key: string) => string;
};

export function Footer({ t }: Footerprops){
    return(
    <>
        <footer className="footer">
            <section className="gridcontainer">
            <section className="ersteSpalte">
                <p>{t("footer_öffnungszeiten")}</p>
                <p>{t("footer_montag")}</p>
                <p>{t("footer_woche")}</p>
                <p>{t("footer_wochenende")}</p>
            </section>
            <section className="zweiteSpalte">
                <p><Link to="/Impressum" aria-label="Link zum Impressum">{t("footer_impressum")}</Link></p>
                <p><Link to="/Datenschutz" aria-label="Link zum Datenschutz">{t("footer_datenschutz")}</Link></p>
                <p><Link to="/uberuns" aria-label="Link zur Seite Über uns ">{t("footer_überuns")}</Link></p>
                <p><Link to="/Kontakt" aria-label="Link zur Kontaktseite">{t("footer_kontakt")}</Link></p>
                <p><Link to="/FAQ" aria-label="Link zum FAQ">{t("footer_faq")}</Link></p>
           </section>
           <section className="dritteSpalte">
               <p>{t("footer_socialmedia")}</p>
               <section className="social-icons">
                    <a href="https://instagram.com" aria-label="Link zu Instagram" className="icon-container">
                        <img src="/instagram_logo.webp" alt="Instagram Logo" className="icon-image"/>
                        <span>{t("footer_insta")}</span>
                    </a>
                    <a href="https://facebook.com" aria-label="Link zu Facebook" className="icon-container">
                        <img src="/facebook_logo.webp" alt="Facebook Logo" className="icon-image"/>
                        <span>{t("footer_facebook")}</span>
                    </a>
                </section>
            </section>
            </section>
        </footer>   
    </>
    )
};