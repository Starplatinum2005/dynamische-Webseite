import './stylesheets/Kontakt.css'

export function Kontakt (){
    return(
        <>
    <header className='überuns_header'>
        <h1>Kontakt</h1>
    </header>

    <section className="Kontakt">
        <h2>Kontaktformular</h2>
        <form action="Sendebestätigung.html" className="Kontaktformular">
            
            <label htmlFor="Vorname">Vorname:</label>
            <input type="text" id="Vorname" placeholder="Vorname" required/>
        
            <label htmlFor="Nachname">Nachname:</label>
            <input type="text" id="Nachname" placeholder="Nachname" required/>
        
            <label htmlFor="E-mail">E-Mail:</label>
            <input type="email" id="E-mail" placeholder="Ihre E-Mail-Adresse" required/>
        
            <label htmlFor="Ihr Anliegen">Ihr Anliegen:</label>
            <textarea id="Ihr Anliegen" placeholder="Ihre Nachricht" rows={5} required></textarea>
        
            <button type="submit" className="button">Absenden</button>
        </form>
    </section>
        </>
    )
}