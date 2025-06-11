import './stylesheets/Impressum.css'

export function Impressum() {
    return(
        <>
    <head>
        <title> Blue Ocean dive - Startseite </title>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
    </head>
    <header className='impressum_header'>
        <h1>Impressum</h1>
    </header>

    <main>

    <section className="Anschrift">
        <ul>
           <li className="fett">Blue Ocean Dive GmbH & Co. KG</li>
            <li>Maximilian Fischer</li>
            <li>Seestraße 12</li>
            <li>89518 Heidenheim</li>
            <li>Deutschland</li>
        </ul>
    </section>

    <section className="Anschrift">
        <ul>
            <li className="fett">Kontakt</li>
            <li>Tel.: +49 8789 57569</li>
            <li>Fax: 0711 918 32 23</li>
            <li>E-Mail: Maximilian.fischer@email.com</li>
        </ul>
    </section>

    <section className="Anschrift">
        <ul>
            <li className="fett">Umsatzsteuer</li>
            <li>Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz</li>
            <li>DE498619845</li>
        </ul>
    </section>

    <section className="Anschrift">
        <ul>
            <li className="fett">Haftung für Inhalte</li>
            <li>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</li>
            <li>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</li>
        </ul>
    </section>

    <section className="Anschrift">
        <ul>
            <li className="fett">Urheberrecht</li>
            <li>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Gemäß §§ 8 bis 10 TMG sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Anhaltspunkten für rechtswidrige Tätigkeiten zu suchen.</li>
            <li>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine Haftung ist jedoch erst ab dem Zeitpunkt möglich, an dem wir von einer konkreten Rechtsverletzung Kenntnis erhalten. Sobald entsprechende Rechtsverletzungen bekannt werden, werden wir diese Inhalte umgehend entfernen.</li>
        </ul>
    </section>
    
    <p className='p'>Bei dieser Website handelt es sich um ein studentisches Projekt. Alle genannten Daten sind frei erfunden, daher übernehmen wir keinerlei Haftung!</p>
    </main>
        </>
    )
}