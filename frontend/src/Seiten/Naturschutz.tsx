import './stylesheets/Naturschutzgebiet.css';
import { Naturschutztext } from '../Objects/Naturschutz';
import {Hochzaehler} from './Zähler';

export function Naturschutz (){
    return(
    <>
    <main className='main_Naturschutzgebiet'>
        <h1 className='h1_Naturschutzgebiet'>{Naturschutztext.Naturschutzgebiet.h1}</h1>

        <section className="Naturschutzgebiet-container">
            <img className="Naturschutzgebiet-image" src="https://cdn.pixabay.com/photo/2023/10/30/13/49/ai-generated-8352912_640.jpg" alt="Korallenriff"/>
            <article className="Naturschutzgebiet-text">
                <p>{Naturschutztext.Naturschutzgebiet.p}</p>
                <h2>{Naturschutztext.Vision.h2}</h2>
                <p>{Naturschutztext.Vision.p}</p>
            </article>
        </section>
    
        <section className="Müllsammeln">
            <img className="Müllsammeln-image" src="https://cdn.pixabay.com/photo/2023/02/14/04/39/volunteer-7788809_960_720.jpg" alt="Mann sammelt den Müll in einen Sack"/>
            <article className = "Müllsammeln-text">
                <h2>{Naturschutztext.Erhaltung.h2}</h2> 
                <p>{Naturschutztext.Erhaltung.p1}</p>
                    
                <h3>{Naturschutztext.Erhaltung.h3_1}</h3>
                <p>{Naturschutztext.Erhaltung.p2}</p>
            
                <h3>{Naturschutztext.Erhaltung.h3_2}</h3> 
                <p>{Naturschutztext.Erhaltung.p3}</p>
                <h3>{Naturschutztext.Erhaltung.h3_3}</h3>   
                <p>{Naturschutztext.Erhaltung.p4}</p>
            </article> 
        </section>

        <br/>
        <br/>
        <br/>
    
        <section className="Taucher">
            <img className="Taucher-image" src="https://cdn.pixabay.com/photo/2024/10/18/06/56/scuba-diving-9129600_1280.jpg" alt="Zwei Taucher, die im Wasser tauchen"/>
            <article className = "Taucher-text">
                    <h2>  {Naturschutztext.Taucher.h2_1} </h2>  
                    <p>{Naturschutztext.Taucher.p1}</p>
                    <h2>  {Naturschutztext.Taucher.h2_2}</h2>      
                    <p>{Naturschutztext.Taucher.p2}</p>
            </article> 
        </section>
       
        <br/>
    
        <section>
            <h2>  {Naturschutztext.Nachhaltigkeit.h2} </h2>     
            <p>{Naturschutztext.Nachhaltigkeit.p1}</p>
            <br/>
            <p>{Naturschutztext.Nachhaltigkeit.p2}.</p>
        </section>
        <Hochzaehler />
    </main>
    </>
);
}