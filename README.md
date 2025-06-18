# dynamische-Webseite

## Inhaltsverzeichnis

-[Installationsanleitung](#installationsanleitung)

-[npm packages](#npm-packages)

-[neueste Änderungen](#neueste-änderungen)

-[dynamische Inhalte](#dynamische-inhalte)

-[Komponente](#komponente)

-[Routing](#routing)

-[Shop](#shop)

-[LogIn und Ausloggen](#login-und-ausloggen)

-[Formularvalidierung](#formularvalidierung)

-[Pfadmarkierung](#pfadmarkierung)


## Installationsanleitung

- Installation aller Packete: ``npm i``
- start auf localhost: ``npm run dev``

## npm Packages

- react
- react-dom
- react-router-dom -> für das Routing
- sweetalert2 -> Um Pop-ups beim An- und Abmelden und beim "bezahlen" zu sehen

## neueste Änderungen

- Webseite mit React + Vite dynamisiert
- Shop- und Warenkorb-Seite eingefügt
- Log-In implementiert
    - Keine Daten Überprüfung
    - Benutzername wird nur oben rechts erstetzt bei Anmeldung
- FAQ Seite eingebaut
- dyn. Formularvalidierung bei einigen Formularen( Anmeldung )
- In der Navigationsleiste wird durch Unterstreichung angezeigt wo man ist

## dynamische Inhalte
- Routing
- Shopartikel können im Warenkorb gespeichert werden und in der nächsten Seite aufgerufen werden und der Gesamtpreis wird autom. addiert
- LogIn/Registrierung ist möglich
    - Nutzername und Passwort werden gespeichert, aber nicht überprüft -> es wird also kein Koto dauerhaft angelegt
    - Nutzername wird anstatt des LogInsymbols in der Navigationsleiste angezeigt
- Formularvalidierung bei Anmeldung
- In der Navigationsleiste wird durch Unterstreichung angezeigt wo man ist

## Komponente
- Navigationsleiste
- Footer
- Kontaktformular der Kontaktseite
- die Boxen mit Informationen der Angebotsseite
- die Boxen der Kurse auf der Angebotsseite
- die versch. Boxen für die Kurse auf der Buchungsseite
- Artikelkachel im Shop
- Box für die Projekte auf der Startseite

## Routing

```
function App() {
  return (
    <>
    <ScrollToTop/>
    <Header/>
      <main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/Angebote" element={<Angebote />} />
          <Route path='/uberuns' element={<Überuns />} />
          <Route path='/Kontakt' element={<Kontakt />} />
          <Route path='/Impressum' element={<Impressum />} />
          <Route path='/Datenschutz'element={<Datenschutz/>} />
          <Route path='/Bildungsprojekt' element= {<Bildungsprojekt />} /> 
          <Route path='/Spenden' element= {<Hochzaehler />} /> 
          <Route path='/Naturschutz' element = {<Naturschutz />} /> 
          <Route path='/Shop' element = {<Shop />} /> 
          <Route path='/Buchung' element = {<Buchung />} />
          <Route path='/FAQ' element = {<FAQ />} /> 
          <Route path='/warenkorb' element = {<Warenkorb />} />
          <Route path='/LogIn' element = {<Login />} />
          <Route path='/loggedin' element = {<LoggedInPage />} />

        </Routes>
      </main>
    <Footer />
    </>
  );
}
```
- die Ziele der Pfade, die in den Seiten verlinkt werden, werden hier definiert mit `element = {<(zugehöriger Funktionsname) />}`
- So sieht die Verlinkung z.B. aus: `<li><Link to="/Buchung">Höhlentauchen</Link></li>`
- Da der Router in der main.tsx ist gilt der Router für die ganze Seite
- Da mein bei Navigation durch Buttons nicht automatisch an den Anfang der Seite kommt, wurde dieser Code erstellt

```
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
}
```
- npm-Package: react-router-dom

## Shop

- Mehrere Artikel auf der Seite zu sehen, die man in den Warenkorb legen kann (Erklärung des Codes in den Kommentaren)
```
const [cart, setCart] = useState<Produkt[]>([]); // neuer Zustand wird als Warenkorb-Array definiert

useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(existingCart);
}, []); // Der localstorage wird, nach bereitsvorhandenen Items im Warenkorb durchsucht, wenn nichts drin ist, wird ein leeres Array zurückgegeben

const addToCart = (product: Produkt) => {
  const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
  existingCart.push(product);
  localStorage.setItem('cart', JSON.stringify(existingCart));
  setCart(existingCart);
}; // es wird der aktualle Warenkorb aus dem storage geholt und dass neue Item wird mit push in das Array reingetan und das Array wird im Anschluss wieder gespeichert
```
- Die Anzahl der Artikel wird dann beim Button unten rechts angezeigt mit `cart.length`

- Im Warenkorb werden die Sachen dann wieder aufgerufen, die gespeichert wurden
    - Die Art und Weise wie der Warenkorb mit useSate und useEffect geladen wird ,ist die gleiche wie beim Shop

```
  const clearCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
  };//Der Eintrag im localstorage wird gelöscht und auf ein leeres Array gesetzt

  const removeFromCart = (indexToRemove: number) => {
    const newCart = cart.filter((_, index) => index !== indexToRemove);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };// Produkt wird je nach Index gelöscht und der Warenkorb wird aktualisiert

  const handleBezahlen = () => {
    if (localStorage.getItem('eingeloggt') === 'true') { //Unterscheidung ob man eingeloogt ist oder nicht (Eintrag `eingeloggt` entsteht beim Anmelden)
      Swal.fire({// Wenn ja, dann kann direkt bezahlt werden
      title: 'Vielen Dank für Ihren Einkauf!',
      icon: 'success',
      confirmButtonText: 'OK'
      });
      clearCart();// Nach Bezahlung wird cart geleert
      navigate('/');
    } else { // ohne Anmeldung kommt noch ein ANgebot als Köder
      Swal.fire({
        title: 'Rabattcode verfügabr!',
        text: 'Melde dich an um 10% Rabatt auf diesen Einkauf zu erhalten',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Einloggen',
        cancelButtonText: 'Nein danke, ich bin zurückgeblieben!'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login'); // Wenn man sich anmelden will, wird man auf logIn geführt
        } else if (result.dismiss === Swal.DismissReason.cancel) {// sonst wird trotzdem Bezahlt
        navigate('/');
        Swal.fire({
          title: 'Vielen Dank für Ihren Einkauf!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
          clearCart(); //Wagen wird gelehrt
        }
      });
    };
  };

  let total;
  if(localStorage.getItem('eingeloggt') === 'true'){
    total = cart.reduce((sum, item) => sum + item.price, 0) * 0.9; // Rabatt wurde hinzugefügt
  }else{
    total = cart.reduce((sum, item) => sum + item.price, 0);
  }

 let content; // Der Inhalt der angezeigt werden soll wird hier definiert
  if (cart.length === 0) { 
    content = <p className="cart-empty">Warenkorb ist leer.</p>;// Wird angezeigt wenn Warenkorb leer ist
  } else {
    content = (
      <ul className="cart-list"> // Liste mit allen Items aus dem Warenkorb wird angezeigt
        {cart.map((item, index) => ( // cart-Array wird durchlaufen
          <li key={index} className="cart-item">
            <span>{item.name} – €{item.price.toFixed(2)}</span>
            <button className="remove-btn" onClick={ () => removeFromCart(index)}>
              Entfernen
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <main className="cart-main">
      <h1 className="cart-title">🛒 Dein Warenkorb</h1> //Titel
      {content} // Inhalt des Warenkorbs

      {cart.length > 0 && (
        <div className="cart-total">
          <strong>Gesamt:</strong> €{total.toFixed(2)} // Gesamtbetrag wird angezeigt, aber es wird nicht gekennzeichnet ob Rabatt hinzugefügt wurde oder nicht
        </div>
      )}

      {cart.length > 0 && (
        <button className="clear-cart-button" onClick={clearCart}>
          🗑️ Warenkorb leeren // Warenkorb wird geleehrt
        </button>
      )}
      <div className='bezahlen-container'>
        <button className='bezahlen-button' onClick={handleBezahlen}> // Bezahlmethode wird ausgeführt, wenn der Button gedrückt wird
            Jetzt Bezahlen
        </button>
      </div>
    </main>
);
```

## LogIn und Ausloggen

``` Navigationsleiste.tsx
{username ? (
  <Link to="/loggedin"className='span'>Willkommen, {username}!</Link>
) : (
  <Link to="/login" aria-label="LogIn" style={{ fontSize: '1.5rem', color: '#3498db' }}></Link>
)}
```
- Abfrage ob ein User eingelogt ist
  - Wenn nicht, dann steht in der Navigationsleiste ein Icon, auf dass man klicken kann, um zur Login Seite zu kommen
  - Wenn man eingeloggt ist, steht da "Wilkommen" + Benutzernamen, den man in das Benutzernamenfeld beim LogIn eingegeben hat

- Um sich anmelden zu können, werden loakale Zustände definiert, um Benutzername und Passwort speichern zu können
- Bei der Eingabe wird zum einen das Vorhandensein von Benutzername und Passwort geprüft und ob das Passwort mehr als 8 Zeichen hat
  - Wenn eines davon nicht zurtrifft, dann kommt mit sweetalert2 ein Popup, dass sagt, dass die Anmeldung aus einem der beiden Gründe fehlschlägt
  - Wenn beides passt, kommt ein Popup mit einem grünen Haken, der die Anmeldung bestätigt
- Man wird automatich auf die Homepage weitergeleitet und statt dem Loginzeichen steht nun das Wilkommen mit dem Username
- Wenn man darauf klickt, wird man zur Logoutseite weitergeleitet
  - Da kann man mit einem Klicken auf einen Button, den Benutzernamen und das Paswort aus dem localstorage löschen

## Formularvalidierung
- Bei der Anmeldung wird geprüft ,ob die Felder ausgefüllt sind und ,ob das Passwort mindestens 8 Zeichen lang ist
``` Account.tsx
if (username.trim() && password.trim()) { //prüft ob beide Felder eingegeben wurden
    if (password.length < 8) { // prüft ob Passwort min. 8 Zeichen lang ist
      Swal.fire({
        title: 'Fehler!',
        text: 'Das Passwort muss mindestens 8 Zeichen lang sein.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    //...
} else {
    Swal.fire({
        title: 'Fehler!',
        text: 'Bitte Benutzername und Passwort eingeben.',
        icon: 'error',
        confirmButtonText: 'OK'
    });
}
```
- Das Passwort wird dabei auch zensiert und man kann es mit dem Auge neben der Leiste sichtbar machen
- Bei der Buchung und beim Kontaktformular wird nur mit HTML geprüft ,ob etwas drinstehen und es im richtigen Format ist

## Pfadmarkierung

- In der Navigationsleiste wird gezeigt ,auf welcher Seite man ist
  - Problem dabei ist, dass nichts angezeigt wird ,wenn man auf einer Unterseite ist

``` Navigationsleiste.tsx
  className={location.pathname === '/Shop' ? 'active' : ''}
```
- Es wird geprüft ob, der aktuelle Pfad mit dem Zielpfad übereinstimmt (hier: Shop)
  - Wenn es stimmt ,wird die Klasse auf den Pfald angewendet
  - Wenn es nicht stimmt, passiert nichts
