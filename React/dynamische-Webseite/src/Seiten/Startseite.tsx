import './stylesheets/Index.css'
import { Startseite } from '../Objects/Startseite';
import { ProjektBoxen } from '../Komponente/ProjektBoxen';

type Props = { t: (key: string) => string };

export function Index({ t }: Props) {
  return (
    <>
      <main className="startseite">
        <header className="header">
          <img src="/blickfang_startseite.png" alt="Taucher unter Wasser" className="header-image" />
          <section className="header-content">
            <h1> {t("index_welcome")} </h1>
            <p>{t("index_zitat")}</p>
          </section>
        </header>

        <section className="Abschnitt1">
          <article className="Textcontainer1">
            <h1 className='Startseite_h1'>{Startseite.Einführungstext.Überschrift}</h1>
            <p>{t("index_einführungstext")}</p>
          </article>
        </section>

        <h1 className="Startseite_h1 Strich">{t("index_aktuelles")}</h1>

        <section className="Neuigkeiten">
          <ProjektBoxen Projekt={Startseite.Naturschutz} />
          <ProjektBoxen Projekt={Startseite.Bildungsprojekt} />
        </section>

        <h1 className="Startseite_h1 Strich">{t("index_tauchen")}</h1>

        <section className="Abschnitt2">
          <article className="Textcontainer2">
            <div className="Bildcontainer2">
              <img
                className="Bild-mitte"
                src="/mallorca.png"
                alt="Tauchen auf Mallorca"
              />
            </div>
            <p>{t("index_p1")}</p>
            <p>{t("index_p2")}</p>
            <p>{t("index_p3")}</p>
          </article>
        </section>
      </main>
    </>
  )
}