import './stylesheets/FAQ.css';
import {useState} from 'react'; //useState (React Hook) um einen State innerhalb der Component abzubilden

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'Was kostet ein Tauchkurs bei Blue Ocean Dive?',
      answer: 'Die Preise variieren je nach Kurs. Ein Anfängerkurs kostet etwa 300-500 Euro.',
    },
    {
      question: 'Welche Ausrüstung wird für die Tauchkurse bereitgestellt?',
      answer: 'Unsere Tauchschule verfügt über modernstes Ausbildungs-Equipment. Die Pool-Ausbildung findet in unserem 6 Meter tiefen Indoor-Tauchturm statt, und wir stellen die gesamte notwendige Ausrüstung zur Verfügung.',
    },
    {
      question: 'Wo finden die Tauchkurse statt?',
      answer: 'Unsere Tauchkurse finden an verschiedenen Standorten statt, darunter lokale Seen und Meeresgebiete.',
    },
    {
      question: 'Welche Tauchkurse bietet Blue Ocean Dive an?',
      answer: 'Wir bieten eine Vielzahl von Kursen an, darunter Schnuppertauchen, Anfänger-Tauchkurse, Spezialkurse wie Höhlentauchen und Korallentauchen sowie Professional Kurse.',
    },
    {
      question: 'Wann finden die Tauchkurse statt?',
      answer: 'Unsere Kurse sind den jahreszeitlichen Bedingungen angepasst. SSI Anfänger-Tauchkurse und SSI Spezialkurse finden von April bis Oktober statt, während Trockentauchen und Workshops hauptsächlich in den Wintermonaten angeboten werden.',
    },
    {
      question: 'Kann ich auch als Tourist an einem Tauchkurs teilnehmen?',
      answer: 'Ja, unsere Tauchkurse sind auch für Touristen geeignet. Wir bieten spezielle Pakete für Urlauber an.',
    },
    {
      question: 'Wie kann ich einen Tauchkurs bei Blue Ocean Dive buchen?',
      answer: 'Sie können einen Kurs direkt über unsere Website buchen oder uns telefonisch kontaktieren.',
    },
    {
      question: 'Wie sorgt Blue Ocean Dive für die Sicherheit der Taucher?',
      answer: 'Ihre Sicherheit hat für uns höchste Priorität. Wir haben eigene TSC Sicherheits-Standards entwickelt, die dabei helfen, Kurse und Tauchaktivitäten so sicher wie möglich durchzuführen.',
    },
    {
      question: 'Was ist das Naturschutzgebiet "Korallenreich"?',
      answer: 'Das Naturschutzgebiet "Korallenreich" ist ein Projekt von Blue Ocean Dive, das einen sicheren Lebensraum für marine Arten schafft und das Bewusstsein für den Schutz der Ozeane stärkt.',
    },
    {
      question: 'Wie kann ich mich am Naturschutzprojekt beteiligen?',
      answer: 'Besucher und Kursteilnehmer haben die Möglichkeit, an Workshops und speziellen Tauchgängen teilzunehmen, die sich auf Naturschutz konzentrieren. Dabei lernen sie, wie wichtig der Schutz der Unterwasserwelt ist.',
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
                className={`faq-question ${activeIndex === index ? 'active' : ''}`} 
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
              </div>
              <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
                {faq.answer}
              </div>
            </div>
          ))}
      <div className='faq-not-found'>
          Frage nicht gefunden? Kontaktieren Sie uns telefonisch oder per Email!
        </div>
      </div>
    </main>
  </>
);
};

export default FAQ;
