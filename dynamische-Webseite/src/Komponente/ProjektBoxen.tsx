import { useNavigate } from "react-router-dom";
import './Angebotsbox.css' //Die Klasse Jetzt-Buchen ist in dieser Datei
import './ProjektBoxen.css'

type ProjektBox = {
    p: string,
    img: string,
    alt: string,
    navigate: string
}

export function ProjektBoxen({Projekt} : {Projekt: ProjektBox}){
    const navigate = useNavigate();
    return(
        <>
        <article className="Thema">
            <img className="Themabild" src={Projekt.img} alt={Projekt.alt}/>
            <p>{Projekt.p}</p>
            <div className="Jetzt-buchen">
                <button
                 aria-label="Link zum Naturschutz"
                 onClick={() => navigate(Projekt.navigate)}>
                Mehr dazu
                </button>
            </div>
        </article>
        </>
    )
}