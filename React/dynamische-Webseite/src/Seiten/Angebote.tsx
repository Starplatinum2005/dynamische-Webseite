import './stylesheets/Angebote.css'


export function Angebote (){
    return(
        <>
        <main>
            <section className="Anfangscontainer"> 
            <img className="Anfangsbild" src="/Angebote Bild.jpg" alt="Unsere Angebote"/>
            <header className="Anfangstext">
                <h2>Aktuelle Tauchkurse und Angebote</h2>
            </header>
        </section>


        <section className="Angebote-Allgemeines">
            <article className="box">
                <h2>ALLGEMEINES</h2>
                <p>Als eine der bekanntesten und renommiertesten Tauchschulen Mallorca mit über 40 Jahren Erfahrung bieten wir Ihnen das professionelle Umfeld für eine gute und fundierte Tauchausbildung.</p>
            </article>
            <article className="box">
                <h2>SICHERHEIT</h2>
                <p>Ihre Sicherheit hat für uns immer höchste Priorität. Aus diesem Grund haben wir eigene TSC Sicherheits-Standards entwickelt, die dabei helfen, Kurse und Tauchaktivitäten so sicher wie möglich durchzuführen.</p>
            </article>
            <article className="box">
                <h2>KURS-ANGEBOT</h2>
                <p>Tauchen ist ein Outdoor-Sport ist, daher ist unser Kursprogramm den jeweiligen jahreszeitlichen Bedingungen angepasst. Trockentauchen und Workshops bieten wir hauptsächlich in den Wintermonaten an. SSI Anfänger-Tauchkurse und SSI Spezialkurse finden von April bis Oktober statt. Unser umfangreiches Kursangebot umfasst Schnuppertauchen, Anfänger-Tauchkurse, Trainings, Personal Training, Spezialkurse und Professional Kurse.</p>
            </article>
            <article className="box">
                <h2>LOGISTIK</h2>
                <p>Unser Tauchcenter verfügt über eine hervorragende Logistik und modernstes Ausbildungs-Equipment. Theorie-Unterricht findet in einem unserer drei modern ausgestatteten Schulungsräume statt. Die Pool-Ausbildung findet in unserem 6 Meter tiefen Indoor-Tauchturm statt. Zeitraubende Fahrten zu öffentlichen Hallen- oder Freibädern entfallen, das spart Zeit und Geld.</p>
            </article>
        </section>

        <span className="Tauch-Angebote" id="Kurse"> 
            <h1 className="Strich">UNSERE TAUCH-ANGEBOTE</h1>
        </span>

        <section className="Angebote-main" >
            <article className="Angebote-Boxen">
                <img className="Boxen-Image" src="https://cdn.pixabay.com/photo/2012/02/23/08/57/woman-15840_1280.jpg" alt="Delfinschwimmen"/>
                <p>Schnuppertauchen</p>
                   <a className="Jetzt-buchen" href="buchung.html" aria-label="Zur Seite Buchen"><button>Mehr dazu</button></a>
            </article>
            <article className="Angebote-Boxen">
                <img className="Boxen-Image" src="https://cdn.pixabay.com/photo/2015/06/11/23/45/dolphin-806359_1280.jpg" alt="Delfinschwimmen"/>
                <p>Delfintauchen</p>
                <a className="Jetzt-buchen" href="buchung.html" aria-label="Zur Seite Buchen"><button>Mehr dazu</button></a>
            </article>
            <article className="Angebote-Boxen">
                <img className="Boxen-Image" src="https://cdn.pixabay.com/photo/2016/04/26/22/35/coral-1355474_1280.jpg" alt="Delfinschwimmen"/>
                <p>Korallentauchen</p>
                <a className="Jetzt-buchen" href="buchung.html" aria-label="Zur Seite Angebote buchen"><button>Mehr dazu</button></a>
            </article>
        </section>


        <section className="Angebote-main"> 
            <article className="Angebote-Boxen">
                <img className="Boxen-Image" src="https://cdn.pixabay.com/photo/2015/03/11/15/19/divers-668777_1280.jpg" alt="Delfinschwimmen"/>
                <p>Tauchschein</p>
                <a className="Jetzt-buchen" href="buchung.html" aria-label="zur Seite buchen"><button>Mehr dazu</button></a>
            </article>
            <article className="Angebote-Boxen">
                <img className="Boxen-Image" src="https://cdn.pixabay.com/photo/2012/02/23/08/35/below-15685_1280.jpg" alt="Delfinschwimmen"/>
                <p>Höhlentauchen</p>
                <a className="Jetzt-buchen" href="buchung.html" aria-label="zur Seite buchen"><button>Mehr dazu</button></a>
            </article>
        </section>
        </main>
    </>
    )
}