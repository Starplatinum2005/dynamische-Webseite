import { Routes, Route } from 'react-router-dom';
import { useState } from "react";
import { übersetzung } from './Übersetzung';
import { Sprachwechsel } from './Komponente/Sprachwechsel';

import { Footer } from './Komponente/footer';
import { Index } from './Seiten/Startseite';
import { Angebote } from './Seiten/Angebote';
import { Überuns } from './Seiten/Überuns';
import { Bildungsprojekt } from './Seiten/Bildungsprojekt';
import { Buchung } from './Seiten/Buchung';
import { Naturschutz } from './Seiten/Naturschutz';
import { Kontakt } from './Seiten/Kontakt';
import { Header } from './Komponente/NAvigationsleiste';
import { Impressum } from './Seiten/Impressum';
import { Datenschutz } from './Seiten/Datenschutz';
import { Shop } from './Seiten/Shop';
import { Hochzaehler } from './Seiten/Zähler';
import { ScrollToTop } from './Funktionen/ScrollToTop';
import FAQ from './Seiten/FAQ';
import { Warenkorb } from './Seiten/Warenkorb';
import { Login } from './Seiten/Account';
import { LoggedInPage } from './Seiten/Logout';

function App() {
  const [language, setLanguage] = useState('de');
  const t = (key: string) => übersetzung[language][key] || key;

  return (
    <>
      <ScrollToTop />
      <Header language={language} setLanguage={setLanguage} />
      <main>
        <Routes>
          <Route path="/" element={<Index t={t} />} />
          <Route path="/Angebote" element={<Angebote />} />
          <Route path='/uberuns' element={<Überuns />} />
          <Route path='/Kontakt' element={<Kontakt />} />
          <Route path='/Impressum' element={<Impressum />} />
          <Route path='/Datenschutz' element={<Datenschutz />} />
          <Route path='/Bildungsprojekt' element={<Bildungsprojekt />} />
          <Route path='/Spenden' element={<Hochzaehler />} />
          <Route path='/Naturschutz' element={<Naturschutz />} />
          <Route path='/Shop' element={<Shop />} />
          <Route path='/Buchung' element={<Buchung />} />
          <Route path='/FAQ' element={<FAQ />} />
          <Route path='/warenkorb' element={<Warenkorb />} />
          <Route path='/LogIn' element={<Login />} />
          <Route path='/loggedin' element={<LoggedInPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;