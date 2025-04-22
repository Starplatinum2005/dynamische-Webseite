import './stylesheets/FAQ.css';
import {useState} from 'react'; //useState (React Hook) um einen State innerhalb der Component abzubilden

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'Welche Ausrüstung wird für die Tauchkurse bereitgestellt?',
      answer: 'Unsere Tauchschule verfügt über modernstes Ausbildungs-Equipment. Die Pool-Ausbildung findet in unserem 6 Meter tiefen Indoor-Tauchturm statt, und wir stellen die gesamte notwendige Ausrüstung zur Verfügung.',
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
        question: 'Wo finden die Tauchkurse statt?',
        answer: 'Unsere Tauchkurse finden an verschiedenen Standorten statt, darunter lokale Seen und Meeresgebiete.',
    },
    {
        question: 'Was macht Blue Ocean Dive besonders?',
        answer: 'Blue Ocean Dive verbindet Leidenschaft für das Meer mit professioneller Ausbildung und individuellen Tauch-Erlebnissen. Wir legen großen Wert auf höchste Sicherheitsstandards, erfahrene Tauchlehrer und nachhaltiges Tauchen.',
    },
    {
        question: 'Wo befindet sich Blue Ocean Dive?',
        answer: 'Unsere Tauchschule befindet sich auf Mallorca, einer Insel mit traumhaften Stränden und einer beeindruckenden Vielfalt an Tauchrevieren.',
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
        question: 'Wie kann ich mich am Naturschutzprojekt beteiligen?',
        answer: 'Besucher und Kursteilnehmer haben die Möglichkeit, an Workshops und speziellen Tauchgängen teilzunehmen, die sich auf Naturschutz konzentrieren. Dabei lernen sie, wie wichtig der Schutz der Unterwasserwelt ist.',
    },
    {
        question: 'Wie kann ich einen Tauchkurs bei Blue Ocean Dive buchen?',
        answer: 'Sie können einen Kurs direkt über unsere Website buchen oder uns telefonisch kontaktieren.',
    },
    {
        question: 'Was kostet ein Tauchkurs bei Blue Ocean Dive?',
        answer: 'Die Preise variieren je nach Kurs. Ein Anfängerkurs kostet etwa 300-500 Euro.',
    },
    {
        question: 'Wann hat Blue Ocean Dive geöffnet?',
        answer: 'In der Sommersaison haben wir von Dienstag bis Freitag von 12:00 bis 20:00 Uhr und am Wochenende von 10:00 bis 20:00 Uhr geöffnet. Montag ist Ruhetag.',
    },
    {
        question: 'Kann ich auch als Tourist an einem Tauchkurs teilnehmen?',
        answer: 'Ja, unsere Tauchkurse sind auch für Touristen geeignet. Wir bieten spezielle Pakete für Urlauber an.',
    },
  ];

  return (
    <div className="faq-container">
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            {faq.question}
          </div>
          {activeIndex === index && <div className="faq-answer">{faq.answer}</div>}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
