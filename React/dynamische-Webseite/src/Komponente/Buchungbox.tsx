import './Buchungbox.css'
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
}