import './stylesheets/Kontakt.css'
import { Kontaktformular } from '../Komponente/Kontaktformular'

export function Kontakt (){
    return(
    <>
    <head>
        <title> Blue Ocean dive - Startseite </title>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
    </head>
    <header className='Kontakt_header'>
        <h1>Kontakt</h1>
    </header>
    <main>
        <section className="Kontakt">
            <h2>Kontaktformular</h2>
            <Kontaktformular/>
        </section>
    </main>
    </>
    )
}