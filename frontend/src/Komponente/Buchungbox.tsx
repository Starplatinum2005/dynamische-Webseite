import './Buchungbox.css'

export function Buchungsbox({ dbKurs }: { dbKurs: any }){
    const formatDateTime = (dateTimeString: string) => {
        if (!dateTimeString) return 'Kein Datum';
        try {
            const date = new Date(dateTimeString);
            const dateStr = date.toLocaleDateString('de-DE');
            const timeStr = date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
            return `${dateStr} um ${timeStr} Uhr`;
        } catch (e) {
            return dateTimeString;
        }
    };

    return(
        <>
        <div className="kurs-container" id={dbKurs.Kurs_ID}> 
            <img className="kurs-bild" src="/blickfang_angebote.jpg" alt={dbKurs.Titel}/>
            <div className="kurs-info">
                <h2>{dbKurs.Titel}</h2>
                <p><strong>Datum & Zeit:</strong> {formatDateTime(dbKurs.Zeit_der_Veranstaltung)}</p>
                <p><strong>Maximale Teilnehmer:</strong> {dbKurs.Teilnehmerobergrenze || 'Unbegrenzt'}</p>
                <p className="kurs-preis"><strong>Preis:</strong> {dbKurs.Preis} €</p>
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