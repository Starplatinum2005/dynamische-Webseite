import { useNavigate } from 'react-router-dom';
import './stylesheets/Überuns.css';

export function Ueberuns() {
  const navigate = useNavigate();
  return (
    <>
      <main className="überuns">
        <header className="header_überuns">
          <section className="header_überuns-Inhalt">
            <h1>Über Unsere Tauchschule</h1>
            <div className="auszeichnungen-container">
              <img className="auszeichnung_links" src="/zertifikat_1.png" alt="Beste Tauchschule 2025" />
              <img className="logo_überuns" src="/logo.png" alt="Taucher" />
              <img className="auszeichnung_rechts" src="/2.png" alt="Höchste Sicherheitsstandards" />
            </div>
          </section>
        </header>

        <article className="section-container_überuns">
          <img src="/taucher_korallenriff.png" alt="Unsere Mission" className="section-Bild_überuns" />
          <section className="section-Inhalt_überuns">
            <h2>Unsere Mission</h2>
            <p>Unsere Mission ist es, Menschen die faszinierende Unterwasserwelt näherzubringen und sie auf ihrem Weg zum selbstbewussten Taucher zu begleiten. Mit uns tauchst du nicht nur in die Tiefe der Meere, sondern auch in eine Gemeinschaft voller Abenteuerlust, Respekt vor der Natur und purer Begeisterung für das Tauchen.</p>
          </section>
        </article>

        <article className="section-container_überuns">
          <section className="section-Inhalt_überuns">
            <h2>Unsere Geschichte</h2>
            <p>Tauchen ist für uns mehr als nur ein Sport – es ist eine Lebensphilosophie. Gegründet wurde unsere "Blue Ocean Dive"-Tauchschule im Jahr 2006 von vier leidenschaftlichen Tauchern, die ihre Begeisterung für das Unterwasserleben mit anderen teilen wollten. Was mit kleinen Kursen begann, ist heute eine renommierte Tauchschule.</p>
          </section>
          <img src="/tauchladen.png" alt="Tauchladen Blue Ocean Dive" className="section-Bild_überuns" />
        </article>

        <article className="section-container_überuns">
          <img src="/gruppenfoto_überuns.png" alt="Gruppenfoto unserer Tauchlehrer an einem Strand" className="section-Bild_überuns" />
          <section className="section-Inhalt_überuns">
            <h2>Unser Team</h2>
            <p>Unser erfahrenes Team aus zertifizierten Tauchlehrern sorgt dafür, dass jeder Tauchgang sicher, lehrreich und unvergesslich wird. Wir sind stolz darauf, eine familiäre und unterstützende Atmosphäre zu schaffen, in der jeder Teilnehmer in seinem eigenen Tempo lernen kann.</p>
          </section>
        </article>

        <article className="section-container_überuns">
          <section className="section-Inhalt_überuns">
            <h2>Unsere Philosophie</h2>
            <p>Bei Blue Ocean Dive steht die Sicherheit und das Wohlbefinden unserer Taucher an erster Stelle. Wir arbeiten ausschließlich mit modernster Ausrüstung und bieten flexible Kurszeiten an. Unsere kleine Gruppengröße gewährleistet eine individuelle Betreuung und maximalen Lernerfolg.</p>
          </section>
          <img src="/philosophie_überuns.png" alt="Zwei Taucher unter Wasser mit modernster Tauchausrüstung" className="section-Bild_überuns" />
        </article>

        <section className="Interaktiv_überuns">
          <h2>Werde Teil unserer Tauchfamilie!</h2>
          <article className="interaktiv-Inhalt_überuns">
            <blockquote>
              <p>"Blue Ocean Dive hat meine Liebe zum Tauchen entfacht!" ~ Anna M.</p>
            </blockquote>
            <nav className="Verlinkung_überuns">
              <button
                 aria-label="Link zu Kontakt"
                 onClick={() => navigate('/Kontakt')}>
                  Kontaktiere uns
              </button>
              <button
                 aria-label="Link zum Angebote"
                 onClick={() => navigate('/Angebote')}>
                  Kurse entdecken
              </button>
            </nav>
          </article>
        </section>
      </main>
    </>
  );
}