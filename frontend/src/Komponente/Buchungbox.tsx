import './Buchungbox.css'

export function Buchungsbox({ dbKurs }: { dbKurs: any }){
    return(
        <>
        <div className="kurs-container" id={dbKurs.Kurs_ID}> 
            <img className="kurs-bild" src="/blickfang_angebote.jpg" alt={dbKurs.Titel}/>
            <div className="kurs-info">
                <h2>{dbKurs.Titel}</h2>
                <p>Datum: {new Date(dbKurs.Zeit_der_Veranstaltung).toLocaleDateString()}</p>
                <p className="kurs-preis">Preis: {dbKurs.Preis} €</p>
            </div>
        </div>
        </>
    )
}

/*import './Buchungbox.css'
import { Buchungstyp} from '../Objects/Buchung'

export function Buchungsbox({ Kurse }: { Kurse: Buchungstyp }){
    return(
        <>
        <div className="kurs-container" id={Kurse.Id}> 
            <img className="kurs-bild" src={Kurse.Bild} alt={Kurse.Alt}/>
            <div className="kurs-info">
                <h2>{Kurse.h2}</h2>
                <p>{Kurse.p}</p>
                <p className="kurs-preis">{Kurse.Preis}</p>
            </div>
        </div>
        </>
    )
}*/