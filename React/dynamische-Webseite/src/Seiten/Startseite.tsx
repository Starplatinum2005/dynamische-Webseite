
import './stylesheets/Index.css'
import { useNavigate, /*Link*/ } from 'react-router-dom'

const Einführungstext:{ text: string, Überschrift: string } = {
    Überschrift: "WILLKOMMEN BEI BLUE OCEAN DIVE",
    text: "Tauche ein in eine Welt voller Abenteuer, Entspannung und einzigartiger Entdeckungen. Bei Blue Ocean Dive verbinden wir Leidenschaft für das Meer mit professioneller Ausbildung und individuellen Tauch-Erlebnissen. Ob du deine ersten Atemzüge unter Wasser erleben möchtest oder ein erfahrener Taucher bist, bei uns findest du genau das richtige Angebot.Unsere Tauchschule steht für höchste Sicherheitsstandards, erfahrene und herzliche Tauchlehrer sowie unvergessliche Momente in einer faszinierenden Unterwasserwelt. Zudem liegt uns der Schutz der Meere besonders am Herzen. Gemeinsam setzen wir uns für nachhaltiges Tauchen und den Erhalt unserer Ozeane ein.    Willkommen an Bord – entdecke mit uns die Wunder der Tiefsee!",
};

export function Index(){
    const navigate= useNavigate();
    return(
      <>
          <main>
          <section className="Anfangscontainer1">
              <img className="Anfangsbild1" src="/test.jpg" alt="Willkommen"/>
              <article className="Anfangstext1">
                  <h2>BLUE OCEAN DIVE</h2>
              </article>
          </section>

          <section className="Abschnitt1"> 
              <article className="Textcontainer1">
                  <h1>{Einführungstext.Überschrift}</h1>
                  <p>{Einführungstext.text}</p>
              </article>
              <a className="Bildcontainer1">
                  <img className= "Bild-rechts" src="https://cdn.pixabay.com/photo/2015/06/17/20/54/diving-813028_640.jpg" alt="Taucherbild"/>
              </a>
          </section>
  
  
          <h1 className="Strich">AKTUELLES</h1>
  
          <section className="Neuigkeiten">
              <article className="Thema">
                  <img className="Themabild" src="https://cdn.pixabay.com/photo/2023/10/30/13/49/ai-generated-8352912_640.jpg" alt="Wasseroberfläche von unten mit einem Taucher"/>
                  <p>Unser Projekt Naturschutz</p>
                  <div className="Jetzt-buchen">
                      <button
                        aria-label="Link zum Naturschutz"
                        onClick={() => navigate('/Naturschutz')}>
                        Mehr dazu
                      </button>
                    </div>
              </article>
              <article className="Thema">
                  <img className="Themabild" src="https://cdn.pixabay.com/photo/2023/09/14/09/07/pollution-8252584_1280.jpg" alt="Bildungsprojekt"/>
                  <p>Unser Bildungsprojekt</p>
                      
                    <div className="Jetzt-buchen">
                    {/*<button><Link to="/Bildungsprojekt" aria-label="Link zum Bildungsprojekt">Bildungsprojekt</Link></button>*/}
                      <button
                        aria-label="Link zum Bildungsprojekt"
                        onClick={() => navigate('/Bildungsprojekt')}>
                        Mehr dazu
                      </button>
                    </div>
              </article>
          </section>
      
  
  
      <span className="Abschnitt2"> 
          <a className="Bildcontainer2">
              <img className= "Bild-links" src="https://cdn.pixabay.com/photo/2017/01/22/18/00/cala-agulla-2000385_640.jpg" alt="Tauchen auf Mallorca"/>
          </a>
          <div className="Textcontainer2">
              <h1 className="Strich">TAUCHEN AUF MALLORCA</h1>
              <p>Erlebe die faszinierende Unterwasserwelt Mallorcas! Die Insel bietet dir nicht nur traumhafte Strände und kristallklares Wasser, sondern auch eine beeindruckende Vielfalt an Tauchrevieren. Von bunten Korallenriffen über geheimnisvolle Höhlen bis hin zu faszinierenden Wracks – Mallorcas Unterwasserwelt hat für Anfänger und erfahrene Taucher gleichermaßen einiges zu bieten.</p>
              <p>Tauche in kleinen Gruppen an den schönsten Spots der Insel. Entdecke Meeresschildkröten, Zackenbarsche und eine beeindruckende Vielfalt an Fischen, während die Sonne die Wasseroberfläche in ein schimmerndes Lichtspiel verwandelt. Sicherheit, Spaß und nachhaltiges Tauchen stehen dabei immer im Mittelpunkt.</p>
              <p>Mallorca wartet darauf, von dir entdeckt zu werden – und wir freuen uns, dich dabei zu begleiten! Tauche mit uns ein und erlebe unvergessliche Momente unter der Wasseroberfläche.</p>
          </div>
      </span>
  
  
  
      </main>
      
      </>
    )
  }