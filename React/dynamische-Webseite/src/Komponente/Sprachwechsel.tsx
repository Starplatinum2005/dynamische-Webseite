import './Sprachwechsel.css';

type Props = {
  language: string;
  setLanguage: (lang: string) => void;
};

export function Sprachwechsel({ language, setLanguage }: Props) {
  return (
    <div className="sprachwechsel-container">
      <button className="sprachwechsel-btn" onClick={() => setLanguage("de")} disabled={language === "de"}>DE</button>
      <button className="sprachwechsel-btn" onClick={() => setLanguage("en")} disabled={language === "en"}>EN</button>
      <button className="sprachwechsel-btn" onClick={() => setLanguage("es")} disabled={language === "es"}>ES</button>
    </div>
  );
}