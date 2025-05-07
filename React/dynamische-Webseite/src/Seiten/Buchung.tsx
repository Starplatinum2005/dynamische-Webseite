import './stylesheets/buchung.css'

export function Buchung (){
    return (
        <>
        <main className="buchung_main">
    
        <div className="kurs-container">  
            <div className="kurs-info">
                <h2>Warnung</h2>
                <p>Bei dieser Website handelt es sich um ein studentisches Projekt</p>
            </div>
        </div>

        <div className="kurs-container"> 
            <img className="kurs-bild" src="https://cdn.pixabay.com/photo/2012/02/23/08/57/woman-15840_1280.jpg" alt="Schnuppertauchen"/>
            <div className="kurs-info">
                <h2>Schnuppertauchen</h2>
                <p>Der perfekte Einstieg in die Unterwasserwelt für Neugierige und Anfänger. Probieren Sie das Tauchen unter Anleitung aus!</p>
                <p className="kurs-preis">Preis: 60 €</p>
            </div>
        </div>


        <div className="kurs-container">
            <img className="kurs-bild" src="https://cdn.pixabay.com/photo/2015/06/11/23/45/dolphin-806359_1280.jpg" alt="Delfintauchen"/>
            <div className="kurs-info">
                <h2>Delfintauchen</h2>
                <p>Erleben Sie ein unvergessliches Abenteuer beim Tauchen mit Delfinen. Perfekt für Naturliebhaber.</p>
                <p className="kurs-preis">Preis: 110 €</p>
            </div>
        </div>

        <div className="kurs-container">
            <img className="kurs-bild" src="https://cdn.pixabay.com/photo/2016/04/26/22/35/coral-1355474_1280.jpg" alt="Korallentauchen"/>
            <div className="kurs-info">
                <h2>Korallentauchen</h2>
                <p>Entdecken Sie die faszinierende Welt der Korallenriffe. Geeignet für erfahrene Taucher.</p>
                <p className="kurs-preis">Preis: 80 €</p>
            </div>
        </div>

        <div className="kurs-container">
            <img className="kurs-bild" src="https://cdn.pixabay.com/photo/2015/03/11/15/19/divers-668777_1280.jpg" alt="Tauchschein"/>
            <div className="kurs-info">
                <h2>Tauchschein</h2>
                <p>Erlernen Sie die Grundlagen des Tauchens mit einem professionellen Trainer. Ideal für Anfänger und Fortgeschrittene.</p>
                <p className="kurs-preis">Preis: 300 €</p>
            </div>
        </div>

        <div className="kurs-container">
            <img className="kurs-bild" src="https://cdn.pixabay.com/photo/2012/02/23/08/35/below-15685_1280.jpg" alt="Höhlentauchen"/>
            <div className="kurs-info">
                <h2>Höhlentauchen</h2>
                <p>Erkunden Sie die faszinierenden Höhlen unter Wasser und erleben Sie eine einzigartige Herausforderung.</p>
                <p className="kurs-preis">Preis: 130 €</p>
            </div>
        </div>

        <section className="Buchungs-Formular">

            <h1 className="Strich">Buchen Sie Ihren Tauchkurs</h1>
            <form className="Formular">
                <label htmlFor="name">Name:</label>
                <input type="text"  id="name" required placeholder="Max Mustermann" /><br />

                <label htmlFor="email">E-Mail Adresse:</label>
                <input type="email"  id="email" required placeholder="max123@gmail.com" /><br />

                <label htmlFor="number">Anzahl Erwachsene</label>
                <input type="number" id="number" required /><br />

                <label htmlFor="Anzahl">Anzahl Kinder</label>
                <input type="number" id="Anzahl" required /><br />

                <label htmlFor="kurs">Wählen Sie Ihren Kurs</label>
                <select id="kurs" required >
                    <option >Schnuppertauchen (60€ p.P.)</option>
                    <option>Delfintauchen (110€ p.P.)</option>
                    <option>Korallentauchen (80€ p. P.)</option>
                    <option>Tauchschein (300€ p.P.)</option>
                    <option>Höhlentauchen (130€ p.P.)</option>
                </select><br/>

                <label htmlFor="datum">Datum</label>
                <input type="date" id="datum" required /><br/>

                <label htmlFor="nachricht">Anmerkungen und Wünsche:</label>
                <textarea id="nachricht" placeholder="Ihre Nachricht"></textarea><br/>

                <button type="submit">Tauchkurs buchen</button>
            </form>
        </section>
        </main>
    </>
    )
}