import './Sprachwechsel.css';

type Props = {
  language: string;
  setLanguage: (lang: string) => void;
};

export function Sprachwechsel({ language, setLanguage }: Props) {
  return (
    <div className="sprachwechsel-container">
      <span
        className={`sprachwechsel-link${language === "de" ? " active" : ""}`}
        onClick={() => setLanguage("de")}
      >
        DE
      </span>
      <span className="sprachwechsel-divider">/</span>
      <span
        className={`sprachwechsel-link${language === "en" ? " active" : ""}`}
        onClick={() => setLanguage("en")}
      >
        EN
      </span>
      <span className="sprachwechsel-divider">/</span>
      <span
        className={`sprachwechsel-link${language === "es" ? " active" : ""}`}
        onClick={() => setLanguage("es")}
      >
        ES
      </span>
    </div>
  );
}