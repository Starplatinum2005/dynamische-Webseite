import './stylesheets/Index.css'
import { Startseite } from '../Objects/Startseite';
import { ProjektBoxen } from '../Komponente/ProjektBoxen';

export function Index() {
  return (
    <>
      <main className="startseite">
        <header className="header">
          <img src="/Titelbild.jpg" alt="Taucher unter Wasser" className="header-image" />
          <section className="header-content">
            <h1>Willkommen bei Blue Ocean Dive</h1>
            <p>"Tauche ein in die Wc:\Users\BrennLe\Downloads\Startseite.jpgelt der Unterwasser-Abenteuer!"</p>
          </section>
        </header>

        <section className="Abschnitt1">
          <article className="Textcontainer1">
            <h1 className='Startseite_h1'>{Startseite.Einführungstext.Überschrift}</h1>
            <p>Tauche ein in eine Welt voller Abenteuer, Entspannung und einzigartiger Entdeckungen. Bei Blue Ocean Dive verbinden wir Leidenschaft für das Meer mit professioneller Ausbildung und individuellen Tauch-Erlebnissen. Ob du deine ersten Atemzüge unter Wasser erleben möchtest oder ein erfahrener Taucher bist, bei uns findest du genau das richtige Angebot. Unsere Tauchschule steht für höchste Sicherheitsstandards, erfahrene und herzliche Tauchlehrer sowie unvergessliche Momente in einer faszinierenden Unterwasserwelt. Zudem liegt uns der Schutz der Meere besonders am Herzen. Gemeinsam setzen wir uns für nachhaltiges Tauchen und den Erhalt unserer Ozeane ein. Willkommen an Bord – entdecke mit uns die Wunder der Tiefsee!</p>
          </article>
        </section>

        <h1 className="Startseite_h1 Strich">AKTUELLES</h1>

        <section className="Neuigkeiten">
          <ProjektBoxen Projekt={Startseite.Naturschutz} />
          <ProjektBoxen Projekt={Startseite.Bildungsprojekt} />
        </section>

        <h1 className="Startseite_h1 Strich">TAUCHEN AUF MALLORCA</h1>

        <section className="Abschnitt2">
          <article className="Textcontainer2">
            <div className="Bildcontainer2">
              <img
                className="Bild-mitte"
                src="/mallorca.png"
                alt="Tauchen auf Mallorca"
              />
            </div>
            <p>Erlebe die faszinierende Unterwasserwelt Mallorcas! Die Insel bietet dir nicht nur traumhafte Strände und kristallklares Wasser, sondern auch eine beeindruckende Vielfalt an Tauchrevieren. Von bunten Korallenriffen über geheimnisvolle Höhlen bis hin zu faszinierenden Wracks – Mallorcas Unterwasserwelt hat für Anfänger und erfahrene Taucher gleichermaßen einiges zu bieten.</p>
            <p>Tauche in kleinen Gruppen an den schönsten Spots der Insel. Entdecke Meeresschildkröten, Zackenbarsche und eine beeindruckende Vielfalt an Fischen, während die Sonne die Wasseroberfläche in ein schimmerndes Lichtspiel verwandelt. Sicherheit, Spaß und nachhaltiges Tauchen stehen dabei immer im Mittelpunkt.</p>
            <p>Mallorca wartet darauf, von dir entdeckt zu werden – und wir freuen uns, dich dabei zu begleiten! Tauche mit uns ein und erlebe unvergessliche Momente unter der Wasseroberfläche.</p>
          </article>
        </section>
      </main>
    </>
  )
}