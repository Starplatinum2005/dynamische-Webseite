import './stylesheets/Bildungsprojekt.css';
import { Bildungsprojekttext } from '../Objects/Bildungsprojekt';

export function Bildungsprojekt (){
    return(
        <>
        
        <main className='main_Bildungsprojekt'>

        <h1 className='h1_Bildungsprojekt'> {Bildungsprojekttext.Bildungsprojekte.h2}</h1>
        <section className="Bildungsprojekte-container">
        <img className="Bildungsprojekte-image" src="https://cdn.pixabay.com/photo/2023/09/14/09/07/pollution-8252584_1280.jpg" alt = "Bildungsprojekte" />
        <article className="Bildungsprojekte-text">
            <p>  
                {Bildungsprojekttext.Bildungsprojekte.p1}
                <br/>
                {Bildungsprojekttext.Bildungsprojekte.p2}
            </p>
        </article>
    </section>


    
    <section className="Projekte">
    <img className="Projekte-image" src="https://cdn.pixabay.com/photo/2024/02/25/15/36/wash-8595992_1280.jpg" alt = "Kin sammelt Müll" />
    <article className = "Projekte-text">
        <h2 className='h2_Bildungsprojekte'> {Bildungsprojekttext.Workshops.h2}</h2>
        <p>{Bildungsprojekttext.Workshops.p1}</p>
        <br/>
        <p>{Bildungsprojekttext.Workshops.p2}</p>
    </article> 
    </section>

    <br/>
    <br/>

    <section className="Vortragsreihen">
    <img className="Vortragsreihen-image" src="https://cdn.pixabay.com/photo/2022/11/02/13/58/meeting-7564970_1280.jpg" alt="Frau stellt ein Projekt vor"/>
    <article className = "Vortragsreihen-text">
        <h2 className='h2_Bildungsprojekte'>{Bildungsprojekttext.Forschungsprojekte.h2}</h2> 
        <p> {Bildungsprojekttext.Forschungsprojekte.p1} </p>
        <h2 className='h2_Bildungsprojekte'>{Bildungsprojekttext.Forschungsprojekte.h2_2}</h2>
        <p>{Bildungsprojekttext.Forschungsprojekte.h2_2}</p> 
    </article> 
    </section>

    <br/>
    <section>
    <h2 className='h2_Bildungsprojekte'>  {Bildungsprojekttext.Gemeinschaft.h2} </h2>     
    <p> 
        {Bildungsprojekttext.Gemeinschaft.p1}
        <br/>
        {Bildungsprojekttext.Gemeinschaft.p2}
        <br/>
    </p>
    </section>
    </main>
    </>
);
}