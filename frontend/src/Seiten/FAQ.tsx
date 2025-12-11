import './stylesheets/FAQ.css';
import {useState} from 'react'; //useState (React Hook) um einen State innerhalb der Component abzubilden

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'Was kostet ein Tauchkurs bei Blue Ocean Dive?',
      answer: 'Ein Tauchkurs bei Blue Ocean Dive bietet eine Vielzahl von Erlebnissen, von Schnuppertauchen für Anfänger bis hin zu anspruchsvollem Höhlentauchen für Abenteuerlustige, und die Preise variieren je nach Kurs zwischen 60 € und 300 €.',
    },
    {
      question: 'Welche Ausrüstung wird für die Tauchkurse bereitgestellt?',
      answer: 'Wir stellen die komplette Tauchausrüstung zur Verfügung, einschließlich Tauchanzug, Maske, Schnorchel, Flossen, Atemregler, Tarierweste und Tauchflasche.',
    },
    {
      question: 'Wo finden die Tauchkurse statt?',
      answer: 'Unsere Tauchkurse finden in unserem Tauchcenter auf Mallorca statt. Theorie-Unterricht erfolgt in unseren modern ausgestatteten Schulungsräumen, und die Pool-Ausbildung in unserem 6 Meter tiefen Indoor-Tauchturm.',
    },
    {
      question: 'Welche Tauchkurse bietet Blue Ocean Dive an?',
      answer: 'Wir bieten eine Vielzahl von Kursen an, darunter Schnuppertauchen, Anfänger-Tauchkurse, Spezialkurse wie Höhlentauchen und Korallentauchen sowie Professional Kurse.',
    },
    {
      question: 'Welche Voraussetzungen muss ich erfüllen, um an einem Tauchkurs teilzunehmen?',
      answer: 'Für die meisten Kurse ist eine grundlegende Schwimmfähigkeit erforderlich. Für fortgeschrittene Kurse können zusätzliche Voraussetzungen gelten, die wir im Vorfeld mit dir besprechen.',
    },
    {
      question: 'Gibt es spezielle Kurse für Kinder oder Jugendliche?',
      answer: 'Ja, wir bieten spezielle Tauchkurse für Kinder und Jugendliche an, die auf ihre Bedürfnisse und Fähigkeiten abgestimmt sind.',
    },
    {
      question: 'Wann finden die Tauchkurse statt?',
      answer: 'Unsere Kurse sind den jahreszeitlichen Bedingungen angepasst. SSI Anfänger-Tauchkurse und SSI Spezialkurse finden von April bis Oktober statt, während Trockentauchen und Workshops hauptsächlich in den Wintermonaten angeboten werden.',
    },
    {
      question: 'Kann ich auch als Tourist an einem Tauchkurs teilnehmen?',
      answer: 'Ja, Touristen sind bei uns herzlich willkommen. Unsere Kurse sind so gestaltet, dass sie auch für Urlauber gut geeignet sind.',
    },
    {
      question: 'Welche Zertifizierungen kann ich bei Blue Ocean Dive erwerben?',
      answer: 'Bei uns kannst du verschiedene Zertifizierungen erwerben, von Anfänger-Zertifikaten bis hin zu professionellen Qualifikationen wie dem Divemaster.',
    },
    {
      question: 'Wie kann ich einen Tauchkurs bei Blue Ocean Dive buchen?',
      answer: 'Du kannst einen Tauchkurs direkt über unsere Website buchen oder uns telefonisch oder per E-Mail kontaktieren.',
    },
    {
      question: 'Wie sorgt Blue Ocean Dive für die Sicherheit der Taucher?',
      answer: 'Sicherheit hat bei uns höchste Priorität. Wir haben eigene Sicherheitsstandards entwickelt und verwenden modernstes Ausbildungs-Equipment. Unsere erfahrenen Tauchlehrer sorgen dafür, dass alle Tauchgänge sicher und kontrolliert ablaufen.',
    },
    {
      question: 'Was ist das Naturschutzgebiet "Korallenreich"?',
      answer: 'Das "Korallenreich" ist ein von uns initiiertes Naturschutzprojekt, das einen sicheren Lebensraum für bedrohte Meereslebewesen schafft und das Bewusstsein für den Schutz der Ozeane stärkt.',
    },
    {
      question: 'Wie kann ich mich am Naturschutzprojekt beteiligen?',
      answer: 'Du kannst dich aktiv an unserem Naturschutzprojekt beteiligen, indem du an unseren Aufräumaktionen teilnimmst oder durch Spenden zur Korallenaufforstung beiträgst.',
    },
  ];

  return (
    <>
      <main>
        <div className="faq-container">
          <h2 className='h2_FAQ'>FAQ - Häufig gestellte Fragen</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div 
                className={`faq-frage ${activeIndex === index ? 'active' : ''}`} 
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
              </div>
              <div className={`faq-antwort ${activeIndex === index ? 'active' : ''}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        <div className='faq-nicht-gefunden'>
          Frage nicht gefunden? Kontaktieren Sie uns telefonisch oder per Email!
        </div>
      </div>
    </main>
  </>
);
};
