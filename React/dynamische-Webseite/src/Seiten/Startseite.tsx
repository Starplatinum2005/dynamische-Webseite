import './stylesheets/Index.css'
import { Startseite } from '../Objects/Startseite';
import { ProjektBoxen } from '../Komponente/ProjektBoxen';


export function Index(){
    return(
      <>
      <main className="startseite">
      <header className="header">
        <img src="/blickfang_startseite.png" alt="Taucher unter Wasser" className="header-image" />
        <section className="header-content">
          <h1> {Startseite.Hauptüberschrift.h1} </h1>
          <p>{Startseite.Hauptüberschrift.p}</p>
        </section>
      </header>

          <section className="Abschnitt1"> 
              <article className="Textcontainer1">
                  <h1 className='Startseite_h1'>{Startseite.Einführungstext.Überschrift}</h1>
                  <p>{Startseite.Einführungstext.text}</p>
              </article>
          </section>
  
  
          <h1 className="Startseite_h1 Strich">{Startseite.Projekte.h1}</h1>
  
          <section className="Neuigkeiten">
              <ProjektBoxen Projekt={Startseite.Naturschutz} />
              <ProjektBoxen Projekt={Startseite.Bildungsprojekt} />
          </section>
      
  
  
      <section className="Abschnitt2"> 
          <div className="Textcontainer2">
              <h1 className="Startseite_h1 Strich">{Startseite.Abschnitt2.h1}</h1>
              <p>{Startseite.Abschnitt2.p1}</p>
              <p>{Startseite.Abschnitt2.p2}</p>
              <p>{Startseite.Abschnitt2.p3}</p>
          </div>
                <div className="Bildcontainer2">
              <img 
                className="Bild-links" 
                src="https://cdn.pixabay.com/photo/2017/01/22/18/00/cala-agulla-2000385_640.jpg" 
                alt="Tauchen auf Mallorca"
              />
          </div>
        </section>
      </main>
      
      </>
    )
  }