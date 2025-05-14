import './stylesheets/Kontakt.css'
import { Kontaktformular } from '../Komponente/Kontaktformular'

export function Kontakt (){
    return(
    <>
 
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