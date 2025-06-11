import './Navigationsleiste.css'
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Sprachwechsel } from './Sprachwechsel';
/* import { Dispatch, SetStateAction } from 'react' */
import { language } from '../App';

interface HeaderProps {
  language: language;
  setLanguage: React.Dispatch<React.SetStateAction<language>>;
  t: (key: string) => string;
}

export function Header({ language, setLanguage, t }: HeaderProps) {
  const location = useLocation();
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    setUsername(storedUser);
  }, [location]);

  return (
    <nav className="navbar">
      <Link to="/" aria-label="Startseite">
        <img className="logo" src="/logo.png" alt="Taucher" />
      </Link>

      <ul className="navbar-list">
        <li>
          <Link
            to="/"
            aria-label="Startseite"
            className={location.pathname === '/' ? 'active' : ''}
          >
            {t("header_home")}
          </Link>
        </li>
        <li className="dropdown">
          <Link
            to="/Angebote"
            className={`dropbtn ${location.pathname === '/Angebote' ? 'active' : ''}`}
            aria-label="Angebote"
          >
            {t("header_angebote")}
          </Link>
          <ul className="dropdown-content">
            <li><Link to="/Buchung#Schnuppertauchen">{t("header_schnuppertauchen")}</Link></li>
            <li><Link to="/Buchung#Delfintauchen">{t("header_delfintauchen")}</Link></li>
            <li><Link to="/Buchung#Korallentauchen">{t("header_korallentauchen")}</Link></li>
            <li><Link to="/Buchung#Tauchschein">{t("header_tauchschein")}</Link></li>
            <li><Link to="/Buchung#Höhlentauchen">{t("header_höhlentauchen")}</Link></li>
          </ul>
        </li>
        <li>
          <Link
            to="/Shop"
            className={location.pathname === '/Shop' ? 'active' : ''}
            aria-label="Shop"
          >
            {t("header_shop")}
          </Link>
        </li>
        <li>
          <Link
            to="/uberuns"
            className={location.pathname === '/uberuns' ? 'active' : ''}
            aria-label="Über uns"
          >
            {t("header_überuns")}
          </Link>
        </li>
        <li>
          <Link
            to="/Kontakt"
            className={location.pathname === '/Kontakt' ? 'active' : ''}
            aria-label="Kontakt"
          >
            {t("header_kontakt")}
          </Link>
        </li>
        <li>
          {username ? (
            <Link to="/loggedin" className='span'>Willkommen, {username}!</Link>
          ) : (
            <Link to="/login" aria-label="LogIn" style={{ fontSize: '1.5rem', color: '#3498db' }}>
              👤
            </Link>
          )}
        </li>
        <li>
          <div className="übersetzung">
            <Sprachwechsel language={language} setLanguage={setLanguage} />
          </div>
        </li>
      </ul>
    </nav>
  );
}