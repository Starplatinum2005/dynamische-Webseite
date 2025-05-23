import './stylesheets/Angebote.css'
import { Boxen, Info} from '../Objects/Angebote';
import { Angebotsbox } from '../Komponente/Angebotsbox';
import { InfoBoxen } from '../Komponente/InfoBoxen';


export function Angebote (){
    return(
    <>
        <main>
        <section className="Anfangscontainer"> 
            <img className="Anfangsbild" src="/blickfang_angebote.jpg" alt="Unsere Angebote"/>
            <header className="Anfangstext">
                <h2>{Info.Header}</h2>
            </header>
        </section>


        <section className="Angebote-Allgemeines">
            <InfoBoxen info={Info.Allgemeines} />
            <InfoBoxen info={Info.Kurs_Angebote} />
            <InfoBoxen info={Info.Logistik} />
            <InfoBoxen info={Info.Sicherheit} />
        </section>

        <span className="Tauch-Angebote" id="Kurse"> 
            <h1 className="Strich">{Boxen.Header}</h1>
        </span>

        <section className="Angebote-main" >
            <Angebotsbox angebot={Boxen.Schnuppertauchen} />
            <Angebotsbox angebot={Boxen.Delfintauchen} />
            <Angebotsbox angebot={Boxen.Korallentauchen} />
        </section>


        <section className="Angebote-main"> 
            <Angebotsbox angebot={Boxen.Tauchschein} />
            <Angebotsbox angebot={Boxen.Höhlentauchen} />
        </section>
        </main>
    </>
    )
}