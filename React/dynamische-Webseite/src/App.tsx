import { Routes, Route } from 'react-router-dom';

import { Footer } from './Komponente/footer';
import { Index } from './Seiten/Startseite';
import { Angebote } from './Seiten/Angebote';
import { Überuns } from './Seiten/Überuns';
import { Bildungsprojekt } from './Seiten/Bildungsprojekt';
import { Naturschutz } from './Seiten/Naturschutz';
import { Kontakt } from './Seiten/Kontakt';
import { Header } from './Komponente/NAvigationsleiste';
import { Impressum } from './Seiten/Impressum';
import { Datenschutz } from './Seiten/Datenschutz';



function App() {
  return (
    <>
    <Header/>
      <main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/Angebote" element={<Angebote />} />
          <Route path='/Überuns' element={<Überuns />} />
          <Route path='/Kontakt' element={<Kontakt />} />
          <Route path='/Impressum' element={<Impressum />} />
          <Route path='/Datenschutz'element={<Datenschutz/>} />
          <Route path='/Bildungsprojekt' element= {<Bildungsprojekt />} /> 
          <Route path='/Naturschutz' element = {<Naturschutz />} /> 
        </Routes>
      </main>
    <Footer />
    </>
  );
}

export default App;
