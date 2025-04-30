import './stylesheets/Überuns.css';

export function Überuns() {
  return (
    <main className="about-us">
      <header className="header">
        <img src="/Tauchbild_1.png" alt="Taucher unter Wasser" className="header-image" />
        <h1>Willkommen bei Blue Ocean Dive</h1>
        <p>"Tauche ein in die Welt von Blue Ocean Dive"</p>
      </header>

      <section className="mission">
        <img src="/Tauchbild_2.png" alt="Unsere Mission" className="section-image" />
        <h2>Unsere Mission</h2>
        <p>Unsere Mission ist es, Menschen die faszinierende Unterwasserwelt näherzubringen und sie auf ihrem Weg zum selbstbewussten Taucher zu begleiten. Mit uns tauchst du nicht nur in die Tiefe der Meere, sondern auch in eine Gemeinschaft voller Abenteuerlust, Respekt vor der Natur und purer Begeisterung für das Tauchen.</p>
      </section>

      <section className="history">
        <img src="/Gründerbild.png" alt="Unsere Geschichte" className="section-image" />
        <h2>Unsere Geschichte</h2>
        <p>Gegründet wurde unsere "Blue Ocean Dive"-Tauchschule im Jahr 2006 von vier leidenschaftlichen Tauchern, die ihre Begeisterung für das Unterwasserleben mit anderen teilen wollten. Was mit kleinen Kursen begann, ist heute eine renommierte Tauchschule, die Taucher aller Erfahrungsstufen willkommen heißt – vom neugierigen Anfänger bis zum erfahrenen Profi.</p>
      </section>

      <section className="team">
        <img src="/Teamfoto.png" alt="Unser Team" className="section-image" />
        <h2>Unser Team</h2>
        <p>Unser erfahrenes Team aus zertifizierten Tauchlehrern sorgt dafür, dass jeder Tauchgang sicher, lehrreich und unvergesslich wird. Wir sind stolz darauf, eine familiäre und unterstützende Atmosphäre zu schaffen, in der jeder Teilnehmer in seinem eigenen Tempo lernen kann.</p>
      </section>

      <section className="values">
        <img src="/Naturschutzprojekt.png" alt="Unsere Werte" className="section-image" />
        <h2>Unsere Werte</h2>
        <p>Bei Blue Ocean Dive steht der Mensch im Mittelpunkt. Wir glauben an individuelles Lernen, kleine Gruppen und unvergessliche Erlebnisse. Der Schutz der Meere liegt uns besonders am Herzen.</p>
      </section>

      <section className="special">
        <img src="/Tauchreise.png" alt="Was uns besonders macht" className="section-image" />
        <h2>Was uns besonders macht</h2>
        <p>Unsere Tauchschule zeichnet sich durch individuelle Betreuung aus, indem wir bewusst in kleinen Gruppen arbeiten, um einen maximalen Lernerfolg für jeden Teilnehmer zu gewährleisten. Unser Kursangebot ist vielfältig und reicht vom Schnuppertauchen für Anfänger bis hin zur Ausbildung zum Divemaster für Fortgeschrittene. Zudem legen wir großen Wert auf Abenteuerlust und organisieren regelmäßig Tauchreisen zu einigen der schönsten Tauchspots weltweit, die unvergessliche Erlebnisse garantieren.</p>
      </section>

      <section className="interactive">
        <h2>Interaktive Elemente</h2>
        <div className="interactive-content">
          <a href="https://example.com/tauchvideo" target="_blank" rel="noopener noreferrer">Video ansehen</a>
          <blockquote>"Blue Ocean Dive hat meine Liebe zum Tauchen entfacht!" – Anna M.</blockquote>
          <a href="https://example.com/buchung" target="_blank" rel="noopener noreferrer">Mehr erfahren</a>
        </div>
      </section>
    </main>
  );
}