import './stylesheets/Überuns.css';

export function Überuns() {
  return (
    <main className="überuns">
      <header className="header">
        <img src="/Landschaft1.png" alt="Taucher unter Wasser" className="header-Bild" />
        <section className="header-Inhalt">
          <h1>Über Blue Ocean Dive</h1>
        </section>
      </header>

      <article className="section-container">
        <img src="/Tauchbild_2.png" alt="Unsere Mission" className="section-Bild" />
        <section className="section-Inhalt">
          <h2>Unsere Mission</h2>
          <p>Unsere Mission ist es, Menschen die faszinierende Unterwasserwelt näherzubringen und sie auf ihrem Weg zum selbstbewussten Taucher zu begleiten. Mit uns tauchst du nicht nur in die Tiefe der Meere, sondern auch in eine Gemeinschaft voller Abenteuerlust, Respekt vor der Natur und purer Begeisterung für das Tauchen.</p>
        </section>
      </article>

      <section className="Zahl-conatainer">
        <div className="Zahl">
          <h3>17+ Jahre</h3>
          <p>Erfahrung</p>
        </div>
        <div className="Zahl">
          <h3>1000+</h3>
          <p>Zufriedene Taucher</p>
        </div>
        <div className="Zahl">
          <h3>50+</h3>
          <p>Tauchspots</p>
        </div>
      </section>

      <article className="section-container">
        <section className="section-Inhalt">
          <h2>Unsere Geschichte</h2>
          <p>Tauchen ist für uns mehr als nur ein Sport – es ist eine Lebensphilosophie. Gegründet wurde unsere "Blue Ocean Dive"-Tauchschule im Jahr 2006 von vier leidenschaftlichen Tauchern, die ihre Begeisterung für das Unterwasserleben mit anderen teilen wollten. Was mit kleinen Kursen begann, ist heute eine renommierte Tauchschule.</p>
        </section>
        <img src="/Tauchladen_3.2.png" alt="Tauchladen Blue Ocean Dive" className="section-Bild" />
      </article>

      <article className="section-container">
        <img src="/Gruppenfoto_1.1.png" alt="Gruppenfoto unserer Tauchlehrer an einem Strand" className="section-Bild" />
        <section className="section-Inhalt">
          <h2>Unser Team</h2>
          <p>Unser erfahrenes Team aus zertifizierten Tauchlehrern sorgt dafür, dass jeder Tauchgang sicher, lehrreich und unvergesslich wird. Wir sind stolz darauf, eine familiäre und unterstützende Atmosphäre zu schaffen, in der jeder Teilnehmer in seinem eigenen Tempo lernen kann.</p>
        </section>
      </article>

      <article className="section-container">
        <section className="section-Inhalt">
          <h2>Unsere Philosophie</h2>
          <p>Bei Blue Ocean Dive steht die Sicherheit und das Wohlbefinden unserer Taucher an erster Stelle. Wir arbeiten ausschließlich mit modernster Ausrüstung und bieten flexible Kurszeiten an. Unsere kleine Gruppengröße gewährleistet eine individuelle Betreuung und maximalen Lernerfolg.</p>
        </section>
        <img src="/Philosophie_1.png" alt="Zwei Taucher unter Wasser mit modernster Tauchausrüstung" className="section-Bild" />
      </article>

      <section className="Interaktiv">
        <h2>Werde Teil unserer Tauchfamilie!</h2>
        <article className="interaktiv-Inhalt">
          <blockquote>
            <p>"Blue Ocean Dive hat meine Liebe zum Tauchen entfacht!" ~ Anna M.</p>
          </blockquote>
          <nav className="Verlinkung">
            <a href="/kontakt">Kontaktiere uns</a>
            <a href="/Angebote">Kurse entdecken</a>
          </nav>
        </article>
      </section>
    </main>
  );
}